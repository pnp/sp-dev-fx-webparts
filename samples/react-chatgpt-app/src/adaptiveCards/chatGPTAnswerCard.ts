export const CARD = {
  "type": "AdaptiveCard",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.3",
  "body": [
      {
          "type": "ColumnSet",
          "columns": [
              {
                  "type": "Column",
                  "width": "auto",
                  "items": [
                      {
                          "type": "Image",
                          "url": "data:image/png;base64,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",
                          "size": "Small"
                      }
                  ],
                  "verticalContentAlignment": "Center"
              },
              {
                  "type": "Column",
                  "width": "stretch",
                  "items": [
                      {
                          "type": "TextBlock",
                          "text": "ChatGPT",
                          "wrap": true,
                          "size": "Large",
                          "weight": "Default"
                      },
                      {
                          "type": "TextBlock",
                          "text": "Powered By OpenAI",
                          "wrap": true,
                          "spacing": "None",
                          "maxLines": 1,
                          "isSubtle": true,
                          "size": "Small"
                      }
                  ]
              },
              {
                  "type": "Column",
                  "width": "auto",
                  "items": [
                      {
                          "type": "TextBlock",
                          "text": "${$root.date}",
                          "wrap": true,
                          "horizontalAlignment": "Right",
                          "isSubtle": true,
                          "size": "Small"
                      }
                  ]
              }
          ]
      },
      {
          "type": "Container",
          "spacing": "medium",
          "style": "emphasis",
          "items": [
              {
                  "type": "TextBlock",
                  "text": "${$root.question}",
                  "wrap": true,
                  "horizontalAlignment": "Right",
                  "color": "Accent"
              }
          ],
          "$when": "${length($root.question)>0}"
      },
      {
          "type": "Container",
          "spacing": "Padding",
          "style": "emphasis",
          "items": [
              {
                  "type": "TextBlock",
                  "text": "${$root.answer}",
                  "wrap": true
              }
          ]
      }
  ]
}
