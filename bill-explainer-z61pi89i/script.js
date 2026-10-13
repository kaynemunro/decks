// Bill explainer prototype: bill data, walkthrough script, line explanations and answers.
// One source for both the page and the voice generator, which parses everything after the
// window.WALKTHROUGH marker as JSON, so the object stays strict JSON: double quotes, no comments
// inside, no trailing commas.
// Amounts and dates are from a real bill (owner's choice). Personal details are never stored here:
// {{m:N}} marks a blacked-out field N characters wide.
// Topic "seed" numbers are illustrative for the admin hit list, not customer data.
window.WALKTHROUGH = {
  "customer": { "name": "{{m:11}}", "address": ["{{m:16}}", "{{m:9}}"], "card": "Visa ending {{m:4}}", "email": "{{m:14}}" },
  "bill": {
    "accountNumber": "{{m:9}}",
    "invoiceNumber": "{{m:9}}",
    "invoiceDate": "23 Sep 2026",
    "billingPeriod": "24 Sep 2026 – 23 Oct 2026",
    "dueDate": "10 Oct 2026",
    "lastMonth": {
      "period": "24 Aug 2026 – 23 Sep 2026",
      "lines": [
        { "id": "lm-prev", "topic": "last-month", "label": "Previous bill balance", "amount": "$179.78" },
        { "id": "lm-paid", "topic": "last-month", "label": "You paid on 09 Sep 2026", "tag": "Thanks", "amount": "-$159.78" },
        { "id": "lm-adj", "topic": "credit", "label": "Bill adjustment", "tag": "Credit", "amount": "$20.00cr" }
      ],
      "carried": { "id": "lm-cf", "topic": "last-month", "label": "Balance carried forward", "amount": "$0.00" }
    },
    "summary": {
      "lines": [
        { "id": "sum-ifp", "topic": "section", "icon": "ifp", "label": "Interest Free Payments", "amount": "$23.01" },
        { "id": "sum-bb", "topic": "section", "icon": "bb", "label": "Broadband – Fibre Starter ({{m:5}})", "amount": "$70.00" },
        { "id": "sum-ma", "topic": "section", "icon": "mobile", "label": "One Plan – {{m:10}}", "amount": "$74.17" },
        { "id": "sum-mb", "topic": "section", "icon": "companion", "label": "Companion One Plan – {{m:9}}", "amount": "$152.09" }
      ],
      "total": { "id": "sum-total", "topic": "total", "label": "Your total charges for this month (rounded by $0.03)", "amount": "$319.30" },
      "gst": { "id": "sum-gst", "topic": "tax", "label": "Includes GST of $35.55" },
      "noGst": { "id": "sum-nogst", "topic": "tax", "label": "Charges not subject to GST $46.73" },
      "pay": { "id": "sum-pay", "topic": "payment", "label": "Credit card payment scheduled for 10 Oct 2026", "amount": "$319.30", "note": "There's nothing for you to do." }
    },
    "sections": [
      {
        "id": "ifp", "kicker": "Interest Free Payments", "title": "Devices and add-ons",
        "lines": [
          { "id": "ifp-phone", "topic": "phone-payment", "friendly": "iPhone 16 Pro", "group": "iPhone 16 Pro", "label": "Payment 20 of 36. Balance remaining $661.28", "period": "24 Aug – 23 Sep 2026", "incl": "$41.33", "insert": "ifp-progress" },
          { "id": "ifp-wallet", "topic": "wallet", "label": "One Wallet Discount: 20 of 36", "period": "24 Aug – 23 Sep 2026", "incl": "-$23.72" },
          { "id": "ifp-case", "topic": "accessory", "friendly": "phone case", "group": "OB iPh 16 Pro Symmetry M/S CLR", "label": "Payment 20 of 24. Balance remaining $11.80", "period": "24 Aug – 23 Sep 2026", "incl": "$2.95" },
          { "id": "ifp-glass", "topic": "accessory", "friendly": "screen protector", "group": "Belkin iPh 16 Pro Glass SP CLR", "label": "Payment 20 of 24. Balance remaining $9.80", "period": "24 Aug – 23 Sep 2026", "incl": "$2.45" }
        ],
        "total": { "id": "ifp-total", "topic": "phone-total", "amount": "$23.01", "notes": ["Includes GST of -$3.09", "Charges not subject to GST $46.73"] }
      },
      {
        "id": "bb", "kicker": "Broadband", "title": "{{m:8}}",
        "lines": [
          { "id": "bb-plan", "topic": "broadband", "label": "Fibre Starter (Unlimited Broadband)", "period": "24 Sep – 23 Oct 2026", "incl": "$70.00" }
        ],
        "total": { "id": "bb-total", "topic": "broadband", "amount": "$70.00", "notes": ["Includes GST of $9.13"] }
      },
      {
        "id": "ma", "kicker": "Mobile", "title": "{{m:10}}",
        "lines": [
          { "id": "ma-plan", "topic": "plan", "label": "One Plan", "period": "24 Sep – 23 Oct 2026", "qty": "1", "incl": "$88.00" },
          { "id": "ma-intl-disc", "topic": "international", "label": "100% International Discount", "period": "24 Sep – 23 Oct 2026", "qty": "1", "incl": "-$10.01" },
          { "id": "ma-intl", "topic": "international", "label": "International", "period": "24 Sep – 23 Oct 2026", "qty": "1", "incl": "$10.01" },
          { "id": "ma-unlock", "topic": "staff-discount", "label": "Unlock 50% One Plan Discount", "period": "24 Sep – 23 Oct 2026", "qty": "1", "incl": "-$44.00" },
          { "id": "ma-roam", "topic": "roaming", "extras": true, "label": "Daily roaming charge", "period": "16 Sep – 18 Sep 2026", "qty": "3", "incl": "$29.97", "insert": "roam-a" },
          { "id": "ma-txt", "topic": "picture-message", "label": "TXT", "period": "24 Aug 2026", "qty": "1", "incl": "$0.20" }
        ],
        "total": { "id": "ma-total", "topic": "line-total", "amount": "$74.17", "notes": ["Includes GST of $9.67"] }
      },
      {
        "id": "mb", "kicker": "Mobile", "title": "{{m:9}}",
        "lines": [
          { "id": "mb-plan", "topic": "plan", "label": "Companion One Plan", "period": "24 Sep – 23 Oct 2026", "qty": "1", "incl": "$42.00" },
          { "id": "mb-intl-disc", "topic": "international", "label": "100% International Discount", "period": "24 Sep – 23 Oct 2026", "qty": "1", "incl": "-$10.01" },
          { "id": "mb-intl", "topic": "international", "label": "International", "period": "24 Sep – 23 Oct 2026", "qty": "1", "incl": "$10.01" },
          { "id": "mb-roam", "topic": "roaming", "extras": true, "label": "Daily roaming charge", "period": "13 Sep – 23 Sep 2026", "qty": "11", "incl": "$109.89", "insert": "roam-b" },
          { "id": "mb-txt", "topic": "picture-message", "label": "TXT", "period": "26 Aug 2026", "qty": "1", "incl": "$0.20" }
        ],
        "total": { "id": "mb-total", "topic": "line-total", "amount": "$152.09", "notes": ["Includes GST of $19.81"] }
      },
      {
        "id": "adj", "kicker": "Bill adjustment for last month", "title": "",
        "lines": [
          { "id": "adj-line", "topic": "credit", "label": "Employee discount", "period": "", "incl": "$20.00cr" }
        ],
        "total": { "id": "adj-total", "topic": "credit", "amount": "$20.00cr", "notes": ["Includes GST of -$2.61"] }
      }
    ]
  },
  "topics": {
    "roaming": {
      "name": "Roaming", "source": "approved",
      "explain": "You roamed for {qty} days ({period}) at $9.99 a day, which comes to {amount}. A roaming day starts the first time you use your phone overseas that day, counted in local time.",
      "seed": { "asked": 1240, "unclear": 41, "type": "unclear", "sample": "I was only overseas for part of the day. Why was I charged for a full day?" },
      "recommend": "Show roaming days on a small calendar, and say once that any use starts a day, counted in local time.",
      "followUp": "Do customers get a text when a roaming day starts? If so, the walkthrough should say so.",
      "questions": [
        { "q": "How is a roaming day counted?", "a": "A roaming day starts the first time your phone is used overseas, even for one message or a moment of data. Days follow local time where you are, and each one is $9.99.", "source": "approved" },
        { "q": "Why was I charged for a day I barely used?", "a": "Any use starts a roaming day, however small: a message, a call or a little data. Once the day has started, it's $9.99, however much or little you use.", "source": "approved" },
        { "q": "Will more roaming show up next month?", "a": "Roaming is charged the month after it happens. This bill runs to 23 September, so any days after that will be on next month's bill.", "source": "approved" }
      ]
    },
    "picture-message": {
      "name": "Picture messages", "source": "approved",
      "explain": "This is a picture message sent on {period}. Picture messages are charged one at a time, at 20 cents each.",
      "seed": { "asked": 140, "unclear": 6, "type": "unclear", "sample": "What is this 20 cent text?" },
      "questions": [
        { "q": "Who did I send it to?", "a": "The bill shows the date and the cost, but not who it went to. The usage breakdown in the One NZ app shows more detail.", "source": "bill" },
        { "q": "Why wasn't it included in my plan?", "a": "Picture messages are charged on top of your plan, at 20 cents each.", "source": "approved" }
      ]
    },
    "staff-discount": {
      "name": "Staff discount", "source": "approved",
      "explain": "Your Unlock Plan staff discount takes 50% off One Plan, which saves you {amountAbs} this month.",
      "seed": { "asked": 60, "unclear": 25, "type": "unclear", "sample": "Is my staff discount still on?" },
      "questions": [
        { "q": "Will I keep this discount?", "a": "That depends on your staff benefits, which aren't shown on the bill. A person can confirm it for you.", "source": "unanswered", "human": true }
      ]
    },
    "international": {
      "name": "International", "source": "approved",
      "explain": "International is included in your plan at no cost. It shows as a $10.01 charge and a matching $10.01 discount, so the two cancel out.",
      "seed": { "asked": 260, "unclear": 9, "type": "unclear", "sample": "Why is there an International charge on my bill?" },
      "questions": [
        { "q": "Why show a charge if it's free?", "a": "So you can see it's part of your plan. The charge and the discount always cancel each other out.", "source": "approved" },
        { "q": "What does International include?", "a": "The bill shows it's included at no cost, but not what it covers. The 'What's included in my plan?' link on your bill has the full list.", "source": "bill" }
      ]
    },
    "plan": {
      "name": "Plans paid a month ahead", "source": "approved",
      "explain": "{label} is {amount} a month. Plans are paid a month ahead, so this covers {period}.",
      "seed": { "asked": 980, "unclear": 35, "type": "unclear", "sample": "Why am I paying for October already?" },
      "recommend": "Add a simple two-part timeline: plans paid a month ahead, usage and phone payments charged after.",
      "followUp": "How do part-month charges look on a first bill or after a plan change? We need a sample to explain them.",
      "questions": [
        { "q": "Why am I paying for next month already?", "a": "Plans are paid a month ahead, so this bill covers your plans from 24 September to 23 October. What you use is charged the month after.", "source": "approved" },
        { "q": "What's included in my plan?", "a": "Your bill links to 'What's included in my plan?' for the full list. The bill itself shows the price and the dates it covers.", "source": "bill" }
      ]
    },
    "broadband": {
      "name": "Broadband", "source": "approved",
      "explain": "Your Fibre Starter broadband is $70.00 a month, paid a month ahead for 24 September to 23 October.",
      "seed": { "asked": 90, "unclear": 8, "type": "unclear", "sample": "Why is broadband charged for next month?" },
      "questions": [
        { "q": "Why is it charged for next month?", "a": "Like your mobile plans, broadband is paid a month ahead. This bill covers 24 September to 23 October.", "source": "approved" }
      ]
    },
    "phone-payment": {
      "name": "Phone payments and balance", "source": "bill",
      "explain": "Your {friendly} is {amount} a month, interest free. This is payment 20 of 36, so 16 are left.",
      "seed": { "asked": 760, "unclear": 52, "type": "unclear", "sample": "The balance says $661. I thought I owed less than that." },
      "recommend": "Show what is actually left to pay after the discount ($281.76) beside the balance ($661.28).",
      "followUp": "What is the payoff amount if a customer leaves or upgrades: with the discount, or without it?",
      "questions": [
        { "q": "How much do I still owe?", "a": "There are 16 payments left. The $661.28 balance is before your One Wallet discount. If the discount continues, those payments come to $281.76.", "source": "assumed" },
        { "q": "Can I pay it off early?", "a": "The bill doesn't say. A person can give you the payoff amount and explain how it affects your discount.", "source": "unanswered", "human": true }
      ]
    },
    "wallet": {
      "name": "One Wallet discount", "source": "bill",
      "explain": "Your One Wallet discount takes {amountAbs} a month off your iPhone payment, so you pay $17.61. It covers more than half the cost.",
      "seed": { "asked": 540, "unclear": 22, "type": "unclear", "sample": "Will I lose the discount if I change plans?" },
      "recommend": "Say plainly how long the discount runs and what would end it.",
      "followUp": "Does a plan change or paying the phone off early end the One Wallet discount?",
      "questions": [
        { "q": "Will the discount continue?", "a": "It's numbered 20 of 36, the same as your phone payments, so it's set to run to the end.", "source": "assumed" },
        { "q": "What happens if I change plans?", "a": "The bill doesn't say. A person can check how a plan change would affect it.", "source": "unanswered", "human": true }
      ]
    },
    "accessory": {
      "name": "Accessory payments", "source": "bill",
      "explain": "Your {friendly} is {amount} a month, interest free. This is payment 20 of 24, so four are left.",
      "seed": { "asked": 120, "unclear": 10, "type": "unclear", "sample": "What is 'OB iPh 16 Pro Symmetry'?" },
      "questions": [
        { "q": "What is this item?", "a": "It's your {friendly}, bought with your phone and paid off monthly. The bill uses the product's short stock name.", "source": "bill" }
      ]
    },
    "phone-total": {
      "name": "Phone payments total", "source": "bill",
      "explain": "Your phone payments come to {amount} this month: $41.33 for the phone, less your $23.72 discount, plus $5.40 for the case and screen protector.",
      "seed": { "asked": 200, "unclear": 28, "type": "unclear", "sample": "Why is it only $23.01 when my phone is $41.33?" },
      "recommend": "Explain why tax shows as a minus in the phone section, or stop showing it to customers.",
      "followUp": "Does the customer bill need the minus tax line, or can it move to the full tax breakdown?",
      "questions": [
        { "q": "Why is the tax a minus here?", "a": "Your phone payments carry no tax, but your One Wallet discount does. So the discount reduces the tax, and this section shows −$3.09.", "source": "assumed" }
      ]
    },
    "line-total": {
      "name": "Mobile totals", "source": "bill",
      "explain": "This mobile's total is {amount}, including the plan, discounts and extras like roaming.",
      "seed": { "asked": 150, "unclear": 14, "type": "unclear", "sample": "Why is my second phone's bill so high?" },
      "questions": []
    },
    "last-month": {
      "name": "Last month's summary", "source": "assumed",
      "explain": "Last month's bill was $179.78. You paid $159.78 on 9 September, and your $20 staff discount covered the rest, so nothing is owing.",
      "seed": { "asked": 330, "unclear": 20, "type": "unclear", "sample": "Did my last payment go through?" },
      "questions": [
        { "q": "Did my last payment go through?", "a": "Yes. The bill shows $159.78 received on 9 September, and nothing carried over.", "source": "bill" }
      ]
    },
    "credit": {
      "name": "Bill credits", "source": "assumed",
      "explain": "This is a $20 staff discount, applied as a credit against last month's bill.",
      "seed": { "asked": 380, "unclear": 47, "type": "error", "sample": "I paid less than my bill. Am I behind?" },
      "recommend": "Check whether cards are charged before or after a credit lands, then show each credit with the date it applied.",
      "followUp": "When a credit lands between bills, is the card charged the reduced amount? Our explanation assumes yes.",
      "questions": [
        { "q": "Why did I pay $20 less than my bill?", "a": "Your $20 staff discount was applied as a credit before your card was charged, so it covered the last $20.", "source": "assumed" }
      ]
    },
    "section": {
      "name": "Summary lines", "source": "bill",
      "explain": "{label} comes to {amount} this month. The detailed charges further down show what makes it up.",
      "seed": { "asked": 100, "unclear": 5, "type": "unclear", "sample": "What's included in this amount?" },
      "questions": []
    },
    "total": {
      "name": "Total and rounding", "source": "assumed",
      "explain": "Your charges add up to $319.27. Bills are rounded to the nearest 10 cents, so the total is $319.30.",
      "seed": { "asked": 310, "unclear": 12, "type": "unclear", "sample": "What's the 3 cents rounding?" },
      "questions": [
        { "q": "Where do the 3 cents go?", "a": "The bill doesn't say. A person can explain how rounding carries over between bills.", "source": "unanswered", "human": true }
      ]
    },
    "tax": {
      "name": "Tax", "source": "assumed",
      "explain": "Your bill includes $35.55 of tax. Your phone payments ($46.73) carry no tax, because it was paid when you bought the phone.",
      "seed": { "asked": 180, "unclear": 22, "type": "unclear", "sample": "Why is tax a minus in the phone section?" },
      "questions": [
        { "q": "Why is tax a minus in the phone section?", "a": "Your phone payments carry no tax, but your One Wallet discount does. So the discount reduces the tax, and that section shows −$3.09.", "source": "assumed" }
      ]
    },
    "payment": {
      "name": "Payment", "source": "bill",
      "explain": "We'll take {amount} from your credit card on 10 October. There's nothing you need to do.",
      "seed": { "asked": 220, "unclear": 10, "type": "unclear", "sample": "When will my payment come out?" },
      "questions": [
        { "q": "Can I pay now instead?", "a": "Yes. Tap Pay or manage payment to pay now or change your card.", "source": "bill" }
      ]
    },
    "other": {
      "name": "Questions the bill can't answer", "source": "unanswered",
      "explain": "",
      "seed": { "asked": 420, "unclear": 100, "type": "missing", "sample": "When does my contract end?" },
      "recommend": "Add the contract end date and phone payoff amount to the bill or app, or send these questions straight to a person.",
      "followUp": "Which of these can billing data answer today, without a person?",
      "questions": []
    }
  },
  "steps": [
    {
      "id": "welcome", "chapter": "Overview",
      "focus": ["sum-total", "sum-pay"],
      "caption": "Kia ora. Your bill this month is $319.30. It's paid automatically from your credit card on 10 October, so there's nothing you need to do. Let's walk through it. Skip ahead whenever you like.",
      "speech": "Kia ora. Your bill this month is three hundred and nineteen dollars thirty. It's paid automatically from your credit card on the tenth of October, so there's nothing you need to do. Let's walk through it. Skip ahead whenever you like.",
      "beats": [["sum-total"], ["sum-total"], ["sum-pay"], ["sum-total", "sum-pay"], ["sum-total", "sum-pay"]],
      "source": "bill", "note": "Every figure is read straight from the bill."
    },
    {
      "id": "change", "chapter": "Overview",
      "focus": ["lm-prev", "sum-total"],
      "caption": "This bill is $139.52 higher than last month. Roaming added $139.86. Without it, this bill would be $179.44, close to last month's $179.78.",
      "speech": "This bill is a hundred and thirty-nine dollars fifty-two higher than last month. Roaming added a hundred and thirty-nine dollars eighty-six. Without it, this bill would be a hundred and seventy-nine dollars forty-four, close to last month's hundred and seventy-nine seventy-eight.",
      "beats": [["lm-prev", "sum-total"], ["sum-ma", "sum-mb"], ["sum-total", "lm-prev"]],
      "source": "bill", "note": "Plain arithmetic from this bill. It doesn't claim a cause; naming one line by line would need last month's bill too."
    },
    {
      "id": "last-month", "chapter": "Last month",
      "focus": ["lm-prev", "lm-paid", "lm-adj", "lm-cf"],
      "caption": "First, a quick look back. Last month's bill was $179.78. You paid $159.78 on 9 September, and your $20 staff discount covered the rest, so you're fully paid up.",
      "speech": "First, a quick look back. Last month's bill was a hundred and seventy-nine dollars seventy-eight. You paid a hundred and fifty-nine dollars seventy-eight on the ninth of September, and your twenty dollar staff discount covered the rest, so you're fully paid up.",
      "beats": [["lm-prev"], ["lm-prev"], ["lm-paid", "lm-adj", "lm-cf"]],
      "source": "assumed", "note": "Assumed: the $20 credit landed before the card was charged, which is why the payment was $20 short."
    },
    {
      "id": "two-windows", "chapter": "How your bill works",
      "focus": [], "insert": "windows",
      "caption": "Your bill looks at two months at once. Plans are paid a month ahead, so this bill covers them from 24 September to 23 October. Anything you've used, plus your phone payments, is charged the month after, so those are from 24 August to 23 September.",
      "speech": "Your bill looks at two months at once. Plans are paid a month ahead, so this bill covers them from the twenty-fourth of September to the twenty-third of October. Anything you've used, plus your phone payments, is charged the month after, so those are from the twenty-fourth of August to the twenty-third of September.",
      "beats": [["win-prev", "win-next"], ["win-next"], ["win-prev"]],
      "source": "approved", "note": "Approved 14 Oct: plans in advance; usage and phone payments in arrears, for all plans like this."
    },
    {
      "id": "ifp-phone", "chapter": "Phone payments",
      "focus": ["ifp-phone", "ifp-wallet"], "insert": "ifp-progress",
      "caption": "Next, your phone. Your iPhone 16 Pro costs $41.33 a month, and your One Wallet discount takes off $23.72. So you pay $17.61, with the discount covering more than half. You're 20 payments in, with 16 to go.",
      "speech": "Next, your phone. Your iPhone 16 Pro costs forty-one dollars thirty-three a month, and your One Wallet discount takes off twenty-three seventy-two. So you pay seventeen dollars sixty-one, with the discount covering more than half. You're twenty payments in, with sixteen to go.",
      "beats": [["ifp-phone"], ["ifp-phone", "ifp-wallet"], ["ifp-wallet"], ["ifp-phone"]],
      "source": "bill", "note": "Read from the bill. $17.61 is $41.33 less $23.72; the discount is 57% of the payment."
    },
    {
      "id": "ifp-accessories", "chapter": "Phone payments",
      "focus": ["ifp-case", "ifp-glass", "ifp-total"],
      "caption": "Your case and screen protector add $2.95 and $2.45 a month, and both finish in four more payments. All up, your phone payments this month are $23.01.",
      "speech": "Your case and screen protector add two ninety-five and two forty-five a month, and both finish in four more payments. All up, your phone payments this month are twenty-three dollars and one cent.",
      "beats": [["ifp-case", "ifp-glass"], ["ifp-total"]],
      "source": "bill", "note": "Read from the bill."
    },
    {
      "id": "broadband", "chapter": "Broadband",
      "focus": ["bb-plan"],
      "caption": "Your Fibre Starter broadband is $70 a month, paid ahead for 24 September to 23 October.",
      "speech": "Your Fibre Starter broadband is seventy dollars a month, paid ahead for the twenty-fourth of September to the twenty-third of October.",
      "beats": [["bb-plan"]],
      "source": "approved", "note": "Read from the bill. Paid in advance: approved 14 Oct."
    },
    {
      "id": "mobile-a-plan", "chapter": "Your mobile",
      "focus": ["ma-plan", "ma-unlock", "ma-intl", "ma-intl-disc"],
      "caption": "Your mobile is on One Plan at $88 a month. Your staff discount halves that, so you pay $44. You'll also see an International charge and a matching discount. They cancel out, to show it's included in your plan at no extra cost.",
      "speech": "Your mobile is on One Plan at eighty-eight dollars a month. Your staff discount halves that, so you pay forty-four dollars. You'll also see an International charge and a matching discount. They cancel out, to show it's included in your plan at no extra cost.",
      "beats": [["ma-plan"], ["ma-unlock"], ["ma-intl", "ma-intl-disc"], ["ma-intl", "ma-intl-disc"]],
      "source": "approved", "note": "Approved 14 Oct: Unlock Plan discount is a staff benefit; International is shown to prove the inclusion is free."
    },
    {
      "id": "mobile-a-extras", "chapter": "Your mobile",
      "focus": ["ma-roam", "ma-txt"], "insert": "roam-a",
      "caption": "Now the extras. Roaming was three days, 16 to 18 September, at $9.99 a day, so $29.97. A roaming day starts the first time you use your phone overseas, and days are counted in local time. The 20 cents is a picture message you sent on 24 August.",
      "speech": "Now the extras. Roaming was three days, the sixteenth to the eighteenth of September, at nine ninety-nine a day, so twenty-nine ninety-seven. A roaming day starts the first time you use your phone overseas, and days are counted in local time. The twenty cents is a picture message you sent on the twenty-fourth of August.",
      "beats": [["ma-roam"], ["ma-roam"], ["ma-roam"], ["ma-txt"]],
      "source": "approved", "note": "Approved 14 Oct: any use starts a roaming day, by local time; a 20c message is a picture message. $9.99 a day is read from the bill."
    },
    {
      "id": "mobile-b-plan", "chapter": "Second mobile",
      "focus": ["mb-plan", "mb-intl", "mb-intl-disc"],
      "caption": "Your second mobile is a Companion One Plan at $42 a month, with International included at no cost here too.",
      "speech": "Your second mobile is a Companion One Plan at forty-two dollars a month, with International included at no cost here too.",
      "beats": [["mb-plan", "mb-intl", "mb-intl-disc"]],
      "source": "approved", "note": "Read from the bill. International wording approved 14 Oct."
    },
    {
      "id": "mobile-b-extras", "chapter": "Second mobile",
      "focus": ["mb-roam", "mb-txt"], "insert": "roam-b",
      "caption": "This phone roamed for 11 days, 13 to 23 September, which comes to $109.89. That's the biggest single charge on your bill. If it was still overseas after 23 September, those days will be on next month's bill. There's also one picture message, at 20 cents.",
      "speech": "This phone roamed for eleven days, the thirteenth to the twenty-third of September, which comes to a hundred and nine dollars eighty-nine. That's the biggest single charge on your bill. If it was still overseas after the twenty-third of September, those days will be on next month's bill. There's also one picture message, at twenty cents.",
      "beats": [["mb-roam"], ["mb-roam"], ["mb-roam"], ["mb-txt"]],
      "source": "approved", "note": "Approved 14 Oct: usage is billed the month after and rarely arrives late. Biggest single charge: read from the bill."
    },
    {
      "id": "total", "chapter": "Total",
      "focus": ["sum-ifp", "sum-bb", "sum-ma", "sum-mb", "sum-total", "sum-gst", "sum-nogst"],
      "caption": "Add it all up and your charges come to $319.27. Bills are rounded to the nearest 10 cents, so you pay $319.30. That total includes $35.55 of tax. Your phone payments carry no tax, because it was paid when you bought the phone.",
      "speech": "Add it all up and your charges come to three hundred and nineteen dollars twenty-seven. Bills are rounded to the nearest ten cents, so you pay three nineteen thirty. That total includes thirty-five dollars fifty-five of tax. Your phone payments carry no tax, because it was paid when you bought the phone.",
      "beats": [["sum-ifp", "sum-bb", "sum-ma", "sum-mb"], ["sum-total"], ["sum-gst"], ["sum-nogst"]],
      "source": "assumed", "note": "Assumed: rounding to the nearest 10 cents, and why phone payments carry no tax. Needs approved wording."
    },
    {
      "id": "pay", "chapter": "Payment",
      "focus": ["sum-pay"],
      "caption": "That's everything. $319.30 comes off your credit card on 10 October. If you'd like to pay sooner or change your card, tap Pay or manage below.",
      "speech": "That's everything. Three hundred and nineteen dollars thirty comes off your credit card on the tenth of October. If you'd like to pay sooner or change your card, tap Pay or manage below.",
      "beats": [["sum-pay"], ["sum-pay"], ["sum-pay"]],
      "source": "bill", "note": "Read from the bill. Pay or manage hands off to a mocked payment screen."
    }
  ],
  "qa": [
    {
      "id": "change-charges", "topic": "", "match": "refund|waive|wrong|dispute|cancel|remove|take off|credit me|fix|reverse|too much|overcharg",
      "answer": "I can't change charges or fix your account from here. If something looks wrong, a person can check it with you and put it right.",
      "cite": [], "source": "policy", "human": true
    },
    {
      "id": "what-is-this", "topic": "", "match": "what is this|what's this|whats this|explain|what does this mean|what does it mean|meaning|what is it",
      "answer": "", "cite": [], "source": "line"
    },
    {
      "id": "advice", "topic": "", "match": "travel pack|cheaper|save money|better plan|better deal|should i|recommend|which plan|switch plan|upgrade",
      "answer": "That's a question about options rather than this bill, so I won't guess. A person can talk it through with you.",
      "cite": [], "source": "unanswered", "human": true
    },
    {
      "id": "higher", "topic": "roaming", "match": "higher|more than last|went up|increase|bigger|so much|expensive|why is my bill",
      "answer": "Your bill is $139.52 higher than last month. Roaming added $139.86: three days on your mobile and 11 days on your second mobile, at $9.99 a day. Without it, this bill would be $179.44.",
      "cite": ["ma-roam", "mb-roam"], "source": "bill"
    },
    {
      "id": "roaming", "topic": "roaming", "match": "roam|overseas|travel|abroad|trip",
      "answer": "Roaming is $9.99 a day. A roaming day starts the first time you use your phone overseas, counted in local time. Your mobile roamed for three days (16 to 18 September) and your second mobile for 11 days (13 to 23 September).",
      "cite": ["ma-roam", "mb-roam"], "source": "approved"
    },
    {
      "id": "owe", "topic": "phone-payment", "match": "owe|balance|pay off|paid off|left on|remaining|how many payments|finish paying",
      "answer": "Your iPhone has 16 payments left. The $661.28 balance on your bill is before your One Wallet discount. If the discount continues, those 16 payments come to $281.76.",
      "cite": ["ifp-phone", "ifp-wallet"], "source": "assumed"
    },
    {
      "id": "wallet", "topic": "wallet", "match": "wallet",
      "answer": "Your One Wallet discount takes $23.72 a month off your iPhone payment, so you pay $17.61. It's numbered 20 of 36, so it runs alongside your phone payments.",
      "cite": ["ifp-wallet"], "source": "assumed"
    },
    {
      "id": "international", "topic": "international", "match": "international",
      "answer": "International is included in your plan at no cost. It shows as a charge and a matching discount so you can see it's there. The two always cancel out.",
      "cite": ["ma-intl", "ma-intl-disc"], "source": "approved"
    },
    {
      "id": "unlock", "topic": "staff-discount", "match": "unlock|50|half|staff|employee",
      "answer": "Your Unlock Plan staff discount takes 50% off One Plan, which is $44 this month. Last month's $20 staff discount shows as a credit in last month's summary.",
      "cite": ["ma-unlock", "lm-adj"], "source": "approved"
    },
    {
      "id": "txt", "topic": "picture-message", "match": "txt|text|picture|photo|message|mms|20c|20 cents",
      "answer": "Each 20 cent message on your bill is a picture message. Your mobile sent one on 24 August, and your second mobile sent one on 26 August.",
      "cite": ["ma-txt", "mb-txt"], "source": "approved"
    },
    {
      "id": "paid-less", "topic": "credit", "match": "paid less|less than my bill|behind|last month|adjustment",
      "answer": "Last month's bill was $179.78. You paid $159.78, and your $20 staff discount was applied as a credit for the rest, so nothing is owing.",
      "cite": ["lm-prev", "lm-paid", "lm-adj"], "source": "assumed"
    },
    {
      "id": "rounding", "topic": "total", "match": "round|3c|3 cents|three cents|cents",
      "answer": "Your charges add up to $319.27. Bills are rounded to the nearest 10 cents, so your total is $319.30.",
      "cite": ["sum-total"], "source": "assumed"
    },
    {
      "id": "tax", "topic": "tax", "match": "gst|tax",
      "answer": "Your bill includes $35.55 of tax. Your phone payments ($46.73) carry no tax, because it was paid when you bought the phone.",
      "cite": ["sum-gst", "sum-nogst"], "source": "assumed"
    },
    {
      "id": "ahead", "topic": "plan", "match": "october|ahead|advance|already|next month|before i|arrears|why.*dates",
      "answer": "Plans are paid a month ahead, so this bill covers your plans from 24 September to 23 October. What you use, and your phone payments, are charged the month after: 24 August to 23 September.",
      "cite": ["ma-plan", "ma-roam"], "source": "approved"
    },
    {
      "id": "payment", "topic": "payment", "match": "pay|card|when.*charged|due|direct debit",
      "answer": "We'll take $319.30 from your credit card on 10 October, so there's nothing to do. You can pay sooner or change your card from Pay or manage payment.",
      "cite": ["sum-pay"], "source": "bill"
    }
  ],
  "fallback": {
    "answer": "I'm not sure about that from your bill, and I'd rather not guess. A person can help. I've passed your question to our billing team so these answers keep getting better.",
    "source": "unanswered", "human": true
  }
};
