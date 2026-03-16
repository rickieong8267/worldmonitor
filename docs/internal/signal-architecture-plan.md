# Signal Architecture Plan: Data, Synthesis, and UI Reorganization

> Date: 2026-03-16
> Scope: strengthen World Monitor's moat by closing signal gaps, clarifying panel roles, and feeding better source families into `Insights`, `Forecasts`, `Strategic Risk`, and `CII`

---

## Thesis

World Monitor is already stronger than Crucix on infrastructure, typed APIs, freshness semantics, and higher-order synthesis. The main weakness is not the engine. It is how the engine is surfaced.

We already have:

- `Strategic Risk Overview`
- `Country Instability Index`
- convergence and cascade logic
- strong cross-domain coverage across conflict, weather, maritime, energy, finance, and infrastructure

We are weaker in:

- packaging macro stress into a simple operator-facing surface
- separating market prices from macro regime from energy stress
- exposing some existing signals as named intelligence primitives
- filling high-value source gaps around radiation, structured sanctions, and supply-chain stress

The goal is not to copy Crucix's shell. The goal is to make World Monitor's own moat more legible.

---

## What We Already Have

### Core moat

The core moat stays:

- `Strategic Risk Overview` as the top-level "stable vs worsening" answer
- `CII` as the country-level instability engine

Those should remain the primary answer layer.

### Existing underexposed strengths

- NOAA/NWS weather alerts already exist
- wildfire / FIRMS-style thermal detection already exists
- thermal spikes already feed `CII`
- FRED/EIA/BIS/USASpending already give us a meaningful economic and policy base
- sanctions already exist as a topic/layer concept
- nuclear facilities and irradiators already exist as static strategic infrastructure

That means some of the work is not new ingestion. It is better packaging and synthesis.

---

## What We Are Missing

### 1. Radiation stack

Missing:

- `Safecast`
- `EPA RadNet`

Why it matters:

- map-native
- useful for alerts, insights, and anomaly detection
- relevant to environmental, industrial, and geopolitical monitoring

Recommended primitive:

- `Radiation Watch`

### 2. Complete macro stress strip

Missing or underused:

- `BAMLH0A0HYM2` high-yield spread
- `ICSA` jobless claims
- `MORTGAGE30US` 30-year mortgage rate
- `M2SL` client-side surfacing
- `GSCPI`

Recommended primitive:

- `Macro Stress`

Core question:

- is systemic financial and economic stress rising?

### 3. Structured sanctions ingestion

Missing:

- `OFAC Sanctions List Service`

Recommended primitive:

- `Sanctions Pressure`

Why it matters:

- feeds entity overlays
- improves economic warfare interpretation
- can strengthen `Insights`, `Strategic Risk`, and country-level context

### 4. Better use of thermal spikes

Not missing as data. Missing as a named product concept.

Recommended primitive:

- `Thermal Escalation`

### 5. KiwiSDR

Exploratory only.

Do not prioritize until we can define a concrete intelligence product around:

- comms anomalies
- jamming/interference
- emissions tied to conflict escalation

---

## Current Product Problem

The current product has semantic overlap.

Today:

- `EconomicPanel` mixes indicators, oil, spending, and central banks
- `CommoditiesPanel` also surfaces overlapping energy/market instruments
- `MacroSignalsPanel` is more crypto/QQQ regime than general macro risk
- the full variant enables multiple overlapping panels at once

Result:

- the same signal can appear in multiple places with different meanings
- the operator must infer semantics from layout rather than from product structure
- more data can make the product feel less clear

Examples:

- oil can mean a tradeable price, an energy stressor, or a macro input
- VIX can mean a market quote or a macro stress signal

Those should not be treated as the same job.

---

## Panel Role Rules

Every panel should answer one question only.

### Strategic Risk Overview

Question:

- is the world becoming more stable or less stable?

### Country Instability Index

Question:

- which countries are becoming materially less stable, and why?

### Macro Stress

Question:

- is systemic stress rising?

Contains:

- VIX
- HY spread
- jobless claims
- 30Y mortgage
- Fed funds
- 10Y-2Y spread
- M2
- GSCPI

### Energy Complex

Question:

- is the energy system under pressure?

Contains:

- WTI
- Brent
- nat gas
- production
- inventories

### Market Tape

Question:

- what is moving right now in tradable markets?

Contains:

- market quotes
- commodities
- indexes
- FX

### Environmental Hazard

Question:

- are physical environmental hazards intensifying anywhere important?

Contains:

- thermal escalation
- severe weather
- radiation watch

---

## Implementation Priorities

### P0

- add `Safecast` + `EPA RadNet`
- complete the macro stress strip
- add structured `OFAC`

### P1

- promote thermal escalation as a first-class concept
- separate macro stress from energy stress from market prices in the UI

### P2

- evaluate KiwiSDR only if a clear intelligence use case emerges

---

## Working Plan

### Phase 1: Close signal gaps

- expand macro series coverage
- add radiation sources
- add OFAC structured ingestion

### Phase 2: Clarify panel roles

- repurpose `EconomicPanel` toward true macro stress
- keep `CommoditiesPanel` as a pure market surface
- separate energy stress from macro interpretation
- decide whether `MacroSignalsPanel` remains niche or gets reframed

### Phase 3: Improve synthesis

- route new signals into `Insights` and `Forecasts`
- add explainable contributions to `Strategic Risk` and `CII`
- use clearer trend language: `stable`, `worsening`, `improving`, `anomalous`

---

## Guardrails

- do not copy Crucix's product shell
- do not solve the problem by adding more overlapping panels
- do not feed every new source directly into core scoring
- do not prioritize exotic feeds ahead of clearer moat builders like radiation, sanctions, and macro stress

---

## Bottom Line

World Monitor should stay distinct:

- broader than Crucix
- deeper than Crucix
- more defensible than Crucix

The path is:

1. preserve `Strategic Risk` and `CII` as the answer layer
2. close the missing signal gaps
3. give every supporting surface one precise operator job
