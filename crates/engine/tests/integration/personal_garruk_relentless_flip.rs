//! Personal build: Garruk Relentless must flip.
//!
//! Oracle (front face):
//!   "When Garruk has two or fewer loyalty counters on him, transform him."
//!
//! This is a CR 603.8 state trigger with a ceiling ("N or fewer"). The parser
//! accepted only the depletion ("has no") and threshold ("N or more") forms,
//! so the trigger was dropped and Garruk never transformed.

use engine::game::scenario::{GameScenario, P0};
use engine::game::scenario_db::GameScenarioDbExt;
use engine::types::counter::CounterType;
use engine::types::game_state::WaitingFor;
use engine::types::phase::Phase;
use engine::types::triggers::TriggerMode;
use engine::types::zones::Zone;

use crate::support::shared_card_db as load_db;

const GARRUK_ORACLE: &str = "When Garruk has two or fewer loyalty counters on him, transform him.\n\
    [0]: Garruk deals 3 damage to target creature. That creature deals damage equal to its power to him.\n\
    [0]: Create a 2/2 green Wolf creature token.";

/// The front-face oracle text parses to a StateCondition trigger.
#[test]
fn garruk_relentless_parses_state_trigger() {
    let parsed = engine::parser::oracle::parse_oracle_text(
        GARRUK_ORACLE,
        "Garruk Relentless",
        &[],
        &["Planeswalker".to_string()],
        &["Garruk".to_string()],
    );
    assert!(
        parsed
            .triggers
            .iter()
            .any(|t| t.mode == TriggerMode::StateCondition),
        "Garruk Relentless must parse a StateCondition trigger; got {:?}",
        parsed.triggers
    );
}

/// Put the real card on the battlefield with `loyalty` counters, run the
/// state-trigger scan and drain the stack. Returns whether Garruk transformed.
fn transformed_with_loyalty(loyalty: u32) -> Option<bool> {
    let db = load_db()?;
    // The trimmed test fixture does not carry this card; run with
    // FORGE_TEST_FULL_DB=1 to exercise it against the full export.
    db.get_face_by_name("Garruk Relentless")?;
    let mut scenario = GameScenario::new();
    scenario.at_phase(Phase::PreCombatMain);
    let garruk = scenario.add_real_card(P0, "Garruk Relentless", Zone::Battlefield, db);
    let mut runner = scenario.build();
    engine::game::rehydrate_game_from_card_db(runner.state_mut(), db);
    // The card enters with its printed loyalty (3); set the exact count.
    {
        let obj = runner.state_mut().objects.get_mut(&garruk).unwrap();
        obj.counters.insert(CounterType::Loyalty, loyalty);
        obj.loyalty = Some(loyalty);
    }

    runner.state_mut().waiting_for = WaitingFor::Priority { player: P0 };
    engine::game::triggers::check_state_triggers(runner.state_mut());
    runner.advance_until_stack_empty();

    let obj = &runner.state().objects[&garruk];
    assert_eq!(obj.zone, Zone::Battlefield, "Garruk must stay on the battlefield");
    Some(obj.transformed)
}

/// CR 603.8: at 2 loyalty the trigger fires and Garruk transforms.
#[test]
fn garruk_relentless_transforms_at_two_loyalty() {
    let Some(transformed) = transformed_with_loyalty(2) else {
        return;
    };
    assert!(transformed, "Garruk must transform at 2 loyalty");
}

/// At 3 loyalty the condition is false, so Garruk stays on his front face.
#[test]
fn garruk_relentless_does_not_transform_at_three_loyalty() {
    let Some(transformed) = transformed_with_loyalty(3) else {
        return;
    };
    assert!(!transformed, "Garruk must not transform at 3 loyalty");
}
