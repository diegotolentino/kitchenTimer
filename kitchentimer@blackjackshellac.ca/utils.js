/*
 * Kitchen Timer: Gnome Shell Kitchen Timer Extension
 * Copyright (C) 2021 Steeve McCauley
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const GETTEXT_DOMAIN = 'kitchen-timer-blackjackshellac';
const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

String.prototype.format = imports.format.format;

const GLib = imports.gi.GLib;
const ByteArray = imports.byteArray;

var clearTimeout, clearInterval;
clearTimeout = clearInterval = GLib.Source.remove;

function logObjectPretty(obj) {
  log(JSON.stringify(obj, null, 2));
}

function setTimeout(func, delay, ...args) {
    const wrappedFunc = () => {
        return func.apply(this, args);
    };
    return GLib.timeout_add(GLib.PRIORITY_DEFAULT, delay, wrappedFunc);
}

function setInterval(func, delay, ...args) {
    const wrappedFunc = () => {
        return func.apply(this, args);
    };
    return GLib.timeout_add(GLib.PRIORITY_DEFAULT, delay, wrappedFunc);
}

function spawn(command, callback) {
    var [status, pid] = GLib.spawn_async(
        null,
        ['/usr/bin/env', 'bash', '-c', command],
        null,
        GLib.SpawnFlags.SEARCH_PATH | GLib.SpawnFlags.DO_NOT_REAP_CHILD,
        null
    );

    if (callback)
        GLib.child_watch_add(GLib.PRIORITY_DEFAULT, pid, callback);
}

function execute(cmdargs) {
  var [ok, stdout, stderr, exit_status] = GLib.spawn_sync(
    null, // working directory
    cmdargs,  // string array
    null,     // envp
    GLib.SpawnFlags.SEARCH_PATH,
    null    // child setup function
  );
  //log("exec "+cmdargs.join(" "));
  //log(`ok=${ok} exit_status=${exit_status} stdout=${stdout}`);
  if (ok) {
    if (exit_status === 0) {
      return ByteArray.toString(stdout);
    }
  }
  return undefined;
}

function uuid(id=undefined) {
  return id === undefined || id.length === 0 ? GLib.uuid_string_random() : id;
}

function isDebugModeEnabled() {
    return new Settings().debug();
}

function addSignalsHelperMethods(prototype) {
    prototype._connectSignal = function (subject, signal_name, method) {
        if (!this._signals) this._signals = [];

        var signal_id = subject.connect(signal_name, method);
        this._signals.push({
            subject: subject,
            signal_id: signal_id
        });
    }

    prototype._disconnectSignals = function () {
        if (!this._signals) return;

        this._signals.forEach((signal) => {
            signal.subject.disconnect(signal.signal_id);
        });
        this._signals = [];
    };
}


