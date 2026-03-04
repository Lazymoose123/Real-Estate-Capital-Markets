
import React from 'react';

export const DICTIONARY: Record<string, { title: string; definition: string }> = {
  "Exit Cap": {
    title: "Exit Capitalization Rate",
    definition: "The rate used to estimate the resale value of a property at the end of a holding period (Resale Price = Year X NOI / Exit Cap). Institutional analysts usually add a 5-10 bps 'buffer' per year of hold over the entry cap."
  },
  "SOFR": {
    title: "Secured Overnight Financing Rate",
    definition: "A broad measure of the cost of borrowing cash overnight collateralized by Treasury securities. It replaced LIBOR as the primary benchmark for floating-rate commercial debt."
  },
  "RUBS": {
    title: "Ratio Utility Billing System",
    definition: "A method of outsourcing utility costs back to tenants based on occupancy or square footage. Analysts often 'normalize' this to ensure it isn't being double-counted in both income and expense reimbursement lines."
  },
  "Yield Maintenance": {
    title: "Yield Maintenance",
    definition: "A prepayment penalty that allows lenders to maintain the same yield as if the borrower had made all scheduled payments until maturity. It is extremely expensive in a declining rate environment."
  },
  "Defeasance": {
    title: "Defeasance",
    definition: "A substitution of collateral. Instead of paying off the loan, the borrower purchases a portfolio of US Treasuries that match the remaining loan payments. Often seen in CMBS financing."
  },
  "Cash Sweeps": {
    title: "Cash Sweep",
    definition: "A protective loan covenant where, if the DSCR falls below a certain threshold, the lender 'sweeps' all excess cash flow into a reserve account instead of distributing it to the owners."
  },
  "The Turn": {
    title: "The Student Housing Turn",
    definition: "The 10-14 day window in August where nearly 100% of a student building's inventory is vacated, cleaned, repaired, and re-occupied. Execution risk here is the #1 cause of NOI leakage in this asset class."
  },
  "DSCR": {
    title: "Debt Service Coverage Ratio",
    definition: "A measure of the cash flow available to pay current debt obligations. Calculated as NOI / Annual Debt Service. Institutional lenders typically look for 1.25x or higher."
  },
  "NOI": {
    title: "Net Operating Income",
    definition: "A property's total income minus all reasonably necessary operating expenses. It excludes debt service, capital expenditures, and income taxes."
  },
  "LTV": {
    title: "Loan-to-Value",
    definition: "The ratio of the loan amount divided by the appraised value or purchase price. Institutional core funds usually hover between 50% and 65% LTV."
  },
  "Promote": {
    title: "GP Promote (Carried Interest)",
    definition: "The General Partner's share of profits in excess of their capital contribution, earned after meeting specific investor return hurdles. This aligns the GP's interests with the LP's success."
  },
  "TIC": {
    title: "Tenant-In-Common",
    definition: "A fractional ownership structure often used in 1031 exchanges, allowing multiple investors to own an undivided interest in a property while maintaining individual tax benefits."
  },
  "PILOT": {
    title: "Payment In Lieu Of Taxes",
    definition: "An agreement between a developer and a local government (usually an IDA) to pay a fixed annual amount instead of standard property taxes, often used as an incentive for new development."
  },
  "1031 Exchange": {
    title: "Section 1031 Exchange",
    definition: "A tax-deferred transaction allowing a real estate investor to sell a property and reinvest the proceeds into a 'like-kind' property, deferring capital gains taxes indefinitely."
  },
  "bps": {
    title: "Basis Points",
    definition: "A unit of measure equal to 1/100th of 1 percent (0.01%). For example, a 50 bps increase in interest rates means a 0.5% hike."
  }
};

export const SYSTEM_INSTRUCTION = `
You are a Senior Capital Markets Associate specializing in institutional Multifamily and Student Housing (Tier 1 markets). 
Your expertise bridges the gap between high-level investment committee (IC) strategy and granular, bottom-up underwriting. 
You possess the legal literacy of a real estate attorney and the mathematical precision of a quantitative fund manager.

Analytical Framework (The "Vetting" Process):
1. Revenue Integrity: Evaluate rent rolls for "softness" (heavy concessions, aged delinquencies).
2. Expense Normalization: Benchmark OpEx ($5,500–$7,000/unit for Class A Multifamily).
3. Capital Stack & Legal: Account for Mezzanine debt, Preferred Equity, Yield Maintenance, Defeasance, Cash Sweeps.
4. Macro-Micro Linkage: Connect SOFR spreads to local university enrollment caps.

Teaching Philosophy:
- Explain the "Why": Justify exit caps relative to 10-Year Treasury.
- Identify "Landmines": RUBS double-counting, underestimating "Turn" expenses.
- Source Citation: Refer to REIS, CoStar, Axiometrics.

When asked for analysis, provide a structured markdown response with clear headings: "Executive Summary", "Revenue Analysis", "Expense Normalization", "Capital Stack & Risk", and "Associate Recommendation".
`;

export const MARKET_BENCHMARKS = {
  OpExPerUnit: {
    Multifamily: { min: 5500, max: 7500 },
    StudentHousing: { min: 6500, max: 8500 },
  },
  ExitCaps: {
    Tier1: 4.75,
    Tier2: 5.50,
  }
};
