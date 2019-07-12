# SDC Voice Presentation 2019

> The computer Programmer is a creator of universes for which he alone is the lawgiver. No playwright, no stage director, no emperor, however powerful, has ever exercised such absolute authority to arrange a stage or field of battle and to command such unswervingly dutiful actors or troops.
>
> *Joseph Weizenbaum - Creator of ELIZA*

## Articles about voice

- [for Alzheimer's patients](https://medium.com/@JaysThoughts/using-the-amazon-echo-to-improve-the-lives-of-alzheimers-patients-f5727560a5eb)
- [The first inception: Eliza](http://digg.com/2017/amazon-alexa-is-not-your-friend)
- [How children see Assistnats](https://www.technologyreview.com/s/608430/growing-up-with-alexa/)
- [Always on Hack from 2018 - Alexa](https://www.zdnet.com/article/amazons-alexa-could-be-tricked-into-snooping-on-users-say-security-researchers/)
- [Skill Stealing and masquarading attachks](https://www.csoonline.com/article/3273929/voice-squatting-attacks-hacks-turn-amazon-alexa-google-home-into-secret-eavesdroppers.html)
- [Sending your requested data to someone else](https://www.forbes.com/sites/kevinmurnane/2018/12/20/amazon-does-the-unthinkable-and-sends-alexa-recordings-to-the-wrong-person/)
- [Arbitrarily invoking actions](https://qz.com/1288743/amazon-alexa-echo-spying-on-users-raises-a-data-privacy-problem/)

## Topics to cover

1. What is Voice
2. Why Voice
3. Google v. Amazon for consumers
    1. How do consumers interact with each
    2. Devices offered
    3. Google
        1. feels a bit more natural with invocation phrases
        2. benefits from googles wide reach for recomendations
        3. wants to be an all in one assistant (trigger an action in your app, redirect to the web, smart home)
        4. natively integrated on virtually every android phone
        5. device handoff
    4. Amazon
        1. Pretty strict with the formulation of requests
        2. stays inside the Alexa app (No linking to the web)
        3. focuses on skills' abilities (doesn't trigger apps, doesn't redirect to web, but can control smart home)
        4. can integrate with phone
    5. Both
        1. Offer implicit and explicit invocations
        2. Support smart home controls
4. High level overview of Google v. Amazon for devs
    1. Google
        1. offers java and javascript for building fulfilment SDK (and node integrations for dialogflow)
        2. `gactions` commandline-tool, console fro managing skills
        3. firebase for hosting (or host yourself)
        4. Alpha, Beta testing and multiple versions running at once
        5. dialogflow or sdk (sdk for more control over language processing)
        6. carry over data with `conv.data` (session), `user.data` (persistent), and `contexts` (sub-sessions)
        7. Documentation - Helpful, easily navigatable and readable w/examples + actual dev docs
    2. Amazon
        1. offers java, javascript, and python SDK
        2. `ASKCLI`, `SMAPI`, console for managing skills
        3. Lambda functions on AWS for hosting (or host yourself)
        4. only sdk available (no integrations like dialogflow supported natively)
        5. Documentation - Horrible, no true dev docs, navigation is difficult, not well structured
        6. Developer must handle user storage on his end (database) via a `userId` (doesn't change between sessions)
            - does provide a `sessionAttributes` for saving data during a conversation
    3. Both
        1. Offer ability to complete transactions (sell)
        2. Offer account linking
        3. Offer multimodal design options
        4. Can be self hosted
5. Basic Design Principles
    1. Design for lowest order device first (voice only)
    2. Higher order devices should offer additional/augmented features
        1. Shorter text, more visual elements
    3. Design for conversation
    4. Handle errors gracefully
        1. You don't want to kick someone out of your app because you don't know what to do
    5. Cater to returning users when you can

## Presentation of Two apps (Time Managment)

The apps are identical in functionality. The only difference is that one uses Actions with Dialogflow and the other uses Alexa.

### Points to highlight

1. Setting up the apps in the console
2. Using the console to define commands
3. Endpoint Requirements
4. Setting up Endpoint fulfilment
5. Demonstrate Apps
