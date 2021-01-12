# Kitchen Timer Extension

Gnome shell kitchen timer extension with the ability to run multiple simultaneous timers.

## Installation

Clone the repository and then run install_local.sh

```
mkdir ~/github
cd ~/github
git clone https://github.com/blackjackshellac/kitchenTimer.git
cd kitchenTimer
./install_local.sh
```

and then restart gnome shell to enable (Alt-F2 'r') or logout/login.

## Setting a quick timer demo

![quick timer demo](https://raw.githubusercontent.com/blackjackshellac/kitchenTimer/main/img/quick_timers_panel_menu_stop_delete.webm)

## Alarm timers

You can also specify alarms as timers with the syntax,

```
name @ HH[:MM[:SS[.ms]]] [am|pm]
```

The time_spec can include am/pm or use 24 hour time.

```
alarm @ 5am
alarm @ 11:30pm
alarm @ 23:30
alarm @ 8:45:00.444am
```

for example, to create an alarm timer that goes off at 5am tomorrow,

![taxi @ 5am create](https://github.com/blackjackshellac/kitchenTimer/blob/main/img/taxi_at_5am_quick.png)

![taxi @ 5am running](https://github.com/blackjackshellac/kitchenTimer/blob/main/img/taxi_at_5am_running.png)


## References

Updating the functionality of this extension, that is no longer maintained,

https://github.com/olebowle/gnome-shell-timer

Many modern extension writing techniques grokked from the excellent,

https://github.com/bjarosze/gnome-bluetooth-quick-connect

