# Fallback and Human Handoff

## Handling Out-of-scope Messages

### 1. Creating an Out-of-scope Intent

You will need to define an `out_of_scope` intent in your NLU training data and **add any known out-of-scope requests as training examples**. As with every intent, you should source the majority of your examples from real conversations.

`nlu.yml`

```yml
nlu:
- intent: out_of_scope
  examples: |
    - I want to order food
    - What is 2 + 2?
    - Who's the US President?
```

### 2. Defining the response message

You'll need to define an out-of-scope response in the domain file. Using the utterance `utter_out_of_scope` as the default response, that would look like:

`domain.yml`

```yml
responses:
  utter_out_of_scope:
  - text: Sorry, I can't handle that request.
```

### 3. Creating an Out-of-Scope Rule

`rules.yml`:

```yml
rules:
- rule: out-of-scope
  steps:
  - intent: out_of_scope
  - action: utter_out_of_scope
```

## NLU Fallbacks

To handle incoming messages with low NLU confidence, use the `FallbackClassifier`. Using this configuration, the intent `nlu_fallback` will be predicted when all other intent predictions fall below the configured confidence threshold. You can then write a rule for what the bot should do when `nlu_fallback` is predicted.

### 1. Updating the configuration

`config.yml`:

```yml
pipeline:
# other components
- name: FallbackClassifier
  threshold: 0.7
```

### 2. Defining the response message

Define the message the bot should send when a message is classified with low confidence by adding a response:

`domain.yml`:

```yml
responses:
  utter_please_rephrase:
  - text: I'm sorry, I didn't quite understand that. Could you rephrase?
```

### 3. Creating an NLU fallback rule

The following Rule will ask the user to rephrase when they send a message that is classified with low confidence:

`rules.yml`:

```yml
rules:
- rule: Ask the user to rephrase whenever they send a message with low NLU confidence
  steps:
  - intent: nlu_fallback
  - action: utter_please_rephrase
```

## Handling Low Action Confidence

To handle cases when the machine learning policies can't predict the next action with high confidence, you can configure the Rule Policy to predict a default action if no Policy has a next action prediction with confidence above a configurable threshold.

### 1. Updating the configuration

You will need to add the RulePolicy to your policies in config.yml. By default, the rule policy comes with the settings below:

`config.yml`:

```yml
policies:
- name: RulePolicy
  # Confidence threshold for the `core_fallback_action_name` to apply.
  # The action will apply if no other action was predicted with
  # a confidence >= core_fallback_threshold
  core_fallback_threshold: 0.4
  core_fallback_action_name: "action_default_fallback"
  enable_fallback_prediction: True
```

### 2. Defining the default response message

To define what your bot will say when action confidence is below the threshold, define a response `utter_default`:

`domain.yml`:

```yml
responses:
  utter_default:
  - text: Sorry I didn't get that. Can you rephrase?
```

When an action confidence is below the threshold, Rasa will run the action `action_default_fallback`. This will send the response `utter_default` and revert back to the state of the conversation before the user message that caused the fallback, so it will not influence the prediction of future actions.

### 3. Customizing the default action (optional)

You can create your own custom action instead of `action_default_fallback` to use as a fallback.

The following snippet is an implementation of a custom action which does the same as `action_default_fallback` but dispatches a different template `utter_fallback_template`:

`actions.py`:

```py
from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.events import UserUtteranceReverted
from rasa_sdk.executor import CollectingDispatcher

class ActionDefaultFallback(Action):
    """Executes the fallback action and goes back to the previous state
    of the dialogue"""

    def name(self) -> Text:
        return ACTION_DEFAULT_FALLBACK_NAME

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(template="my_custom_fallback_template")

        # Revert user message which led to fallback.
        return [UserUtteranceReverted()]
```

## Two-Stage Fallback

The Two-Stage Fallback is made to handle low NLU confidence in multiple stages using the following sequence:

1. A user message is classified with low confidence
  - The user is asked to confirm the intent
2. The user confirms or denies the intent
  - If they confirm, the conversation continues as if the intent was classified with high confidence from the beginning. No further fallback steps are taken.
  - If they deny, the user is asked to rephrase their message.
3. The user rephrases their intent
  - If the message is classified with high confidence, the conversation continues as if the user had this intent from the beginning.
  - If the rephrased user message still has low confidence, the user is asked to confirm the intent.
4. The user confirms or denies the rephrased intent
  - If they confirm, the conversation continues as if the user had this intent from the beginning.
  - If they deny, an ultimate fallback action is triggered (e.g. a handoff to a human). The default ultimate fallback action is to call action_default_fallback. This action causes the bot to utter the utter_default response and to reset the state of the conversation as if the turns that happened during the Two-Stage Fallback did not occur.

The Two-Stage-Fallback can be enabled using the following steps:

### 1. Updating the configuration

`config.yml`:

```yml
pipeline:
# other components
- name: FallbackClassifier
  threshold: 0.7

policies:
# other policies
- RulePolicy
```

### 2. Defining the fallback responses

To define how your bot asks the user to rephrase their message, define the response `utter_ask_rephrase`:

`domain.yml`:

```yml
responses:
  utter_ask_rephrase:
  - text: I'm sorry, I didn't quite understand that. Could you rephrase?
```

### 3. Defining a Two-Stage Fallback rule

This rule will make sure that the Two-Stage-Fallback will be activated whenever a message is received with low classification confidence:

`rules.yml`:

```yml
rules:
- rule: Implementation of the Two-Stage-Fallback
  steps:
  - intent: nlu_fallback
  - action: action_two_stage_fallback
  - active_loop: action_two_stage_fallback
```

### 4. Defining an ultimate fallback action

To define the bot's response when the user denies the rephrased intent, define the response `utter_default`:

`domain.yml`:

```yml
responses:
  utter_default:
  - text: I'm sorry, I can't help you.
```

Or, you can customize `action_default_fallback` for more complex behavior by writing a Custom Action. For example, if you want the bot to call a human and stop interacting with the user:

`actions.py`:

```py
from typing import Any, Dict, List, Text

from rasa_sdk import Action, Tracker
from rasa_sdk.events import UserUtteranceReverted
from rasa_sdk.executor import CollectingDispatcher

class ActionDefaultFallback(Action):
    def name(self) -> Text:
        return "action_default_fallback"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        # tell the user they are being passed to a customer service agent
        dispatcher.utter_message(text="I am passing you to a human...")

        # assume there's a function to call customer service
        # pass the tracker so that the agent has a record of the conversation between the user
        # and the bot for context
        call_customer_service(tracker)

        # pause the tracker so that the bot stops responding to user input
        return [ConversationPaused(), UserUtteranceReverted()]
```

## Human Handoff

A straightforward way to achieve human handoff is to configure your messaging or voice channel to switch which host it listens to based on a specific bot or user message.

For example, the bot can sends a message with a specific payload like e.g. "handoff_to_human" to the channel. When the channel sees this message, it stops listening to the Rasa server, and sends a message to the human channel with the transcript of the chat conversation up to that point.

The implementation for handing off to a human from the front end will depend on which channel you're using. You can see an example implementation using an adaption of the [chatroom](https://github.com/scalableminds/chatroom) channel in the [Financial Demo](https://github.com/RasaHQ/financial-demo) and [Helpdesk-Assistant starterpacks](https://github.com/RasaHQ/helpdesk-assistant).

## Summary

Here's a summary of changes you need to make for each method:

For out-of-scope intents:

- Add training examples for each out-of-scope intent to your NLU data
- Define the out-of-scope response or action
- Define rules for each out-of-scope intent
- Add the RulePolicy to `config.yml`

For single stage NLU fallback:

- Add `FallbackClassifier` to your pipeline in `config.yml`
- Define the fallback response or action
- Define a rule for the `nlu_fallback` intent
- Add the `RulePolicy` to `config.yml`

For handling low core confidence:

- Configure the `RulePolicy` for core fallback in `config.yml`
- Optionally customize the fallback action you configure
- Define an `utter_default` response

For Two-Stage Fallback:

- Add `FallbackClassifier` to your pipeline in `config.yml`
- Define a rule for the `nlu_fallback` intent that triggers the `action_two_stage_fallback` action
- Define an out-of-scope intent in your domain
- Add RulePolicy to `config.yml`

For handing off to a human:

- Configure your front end to switch hosts
- Write a custom action (which could be your fallback action) to send the handoff payload
- Add a rule for triggering handoff (if not part of fallback)
- Add RulePolicy to `config.yml`