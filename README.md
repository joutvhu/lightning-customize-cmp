# lightning-customize-cmp

## Usage Antilocker

- Add following snippet to your component
```xml
<ltng:require scripts="{!$Resource.antilocker}" afterScriptsLoaded="{!c.doInit}"/>
```
- Note: All operations with Antilocker need to wait to after the script loaded

### Usage EventPublisher

- Get list events
```js
Antilocker.EventPublisher.events()
```

- Publish events

```js
Antilocker.EventPublisher.publish('markup://force:navigateBack');
Antilocker.EventPublisher.publish('markup://one:back', ['refresh']);
Antilocker.EventPublisher.publish('markup://force:navigationChange', ['other', 'pageReference']);

// Using events after public

$A.getEvt('force:navigateBack').fire();

var oneBack = $A.getEvt('one:back');
oneBack.setParams({ refresh : true });
oneBack.fire();
```