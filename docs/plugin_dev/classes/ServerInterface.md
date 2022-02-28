---
title: ServerInterface
toc_max_heading_level: 6
---

ServerInterface is the interface with lots of API for plugins to interact with the server. Its sub-class [PluginServerInterface](PluginServerInterface.md) contains extra APIs for plugins to control the plugin itself

The first argument in all plugin events is always the PluginServerInterface. It's recommend to use `server` as the parameter name of the ServerInterface argument which is widely used in this document

You can check the code to see the implementation for deeper understanding

## Property

### logger

A logger for logging message to the console

Type: MCDReforgedLogger, which is inherited from `logging.Logger`

## Method

Methods in the SererInterface object are also the API interface for plugins to control the server and the MCDR

### Utils

#### get_instance

``` python
@classmethod
def get_instance(cls) -> Optional[ServerInterface]
```

A class method, for plugins to get a ServerInterface instance anywhere as long as MCDR is running

#### tr

``` python
def tr(self,
       translation_key: str, *args,
       language: Optional[str] = None, **kwargs) -> Union[str, RTextBase]
```

Return a translated text corresponded to the translation key and format the text with given args and kwargs

If args or kwargs contains [`RText`](../api.md#rtext) element, then the result will be a RText, otherwise the result will be a regular str

If the translation key is not recognized, the return value will be the translation key itself

See [here](../basic.md#translation) for the ways to register translations for your plugin

- Parameter *`translation_key`*: The key of the translation
- Parameter *`args`*: The args to be formatted
- Keyword Parameter *`language`*: Specific language to be used in this
translation, or the language that MCDR is using will be used
- Keyword Parameter *`kwargs`*: The kwargs to be formatted

#### rtr

``` python
def rtr(self, translation_key: str, *args, **kwargs) -> RTextMCDRTranslation
```

Return a RText derived component [`RTextMCDRTranslation`](../api.md#rtextmcdrtranslation), that only translates itself right before displaying or serializing

Using this method instead of [`tr()`](#tr) allows you to display your texts in [user's preferred language](../../preference.md#language) automatically

Of course you can construct `RTextMCDRTranslation` yourself instead of using this method if you want

- Parameter *`translation_key`*: The key of the translation
- Parameter *`args`*: The args to be formatted
- Keyword Parameter *`kwargs`*: The kwargs to be formatted

#### as_basic_server_interface

``` python
def as_basic_server_interface(self) -> ServerInterface
```

Return a ServerInterface instance. The type of the return value is exactly the ServerInterface

It's used for removing the plugin information inside PluginServerInterface when you need to send a ServerInterface

#### as_plugin_server_interface

``` python
def as_plugin_server_interface(self) -> Optional[PluginServerInterface]
```

Return a PluginServerInterface instance. If current thread is not a MCDR provided thread and the object is not a PluginServerInterface instance, it will return None

### Server Control

#### start

``` python
def start(self) -> bool
```

Start the server. Return if the action succeed.

If the server is running or being starting by other plugin it will return `False`

#### stop

``` python
def stop(self) -> None
```

Soft shutting down the server by sending the correct stop command to the server

This option will not stop MCDR

#### wait_for_start

``` python
def wait_for_start(self) -> None
```

Wait until the server is able to start. In other words, wait until the server is stopped

#### restart

``` python
def restart(self) -> None
```

Restart the server

It will first soft stop the server and then wait until the server is stopped, then start the server up

#### stop_exit

``` python
def stop_exit(self) -> None
```

Soft stop the server and exit MCDR

#### exit

``` python
def exit(self) -> None
```

Exit MCDR when the server is stopped

If the server is running return False otherwise return True

Example usage:

``` python
server.stop()  # Stop the server
## do something A
server.wait_for_start()  # Make sure the server is fully stopped. It's necessary to run it in your custom thread
## do something B
server.exit()  # Exit MCDR
```

#### is_server_running

``` python
def is_server_running(self) -> bool
```

Return if the server is running

#### is_server_startup

``` python
def is_server_startup(self) -> bool
```

Return if the server has started up

#### is_rcon_running

``` python
def is_rcon_running(self) -> bool
```

Return if MCDR's rcon is running

#### get_server_pid

``` python
def get_server_pid(self) -> Optional[int]
```

Return the pid of the server process, None if the server is stopped

Notes the process with this pid is a bash process, which is the parent process of real server process you might be interested in

#### get_server_information

``` python
def get_server_information(self) -> Optional[ServerInformation]
```

Return a `ServerInformation` object indicating the information of the current server, interred from the output of the server

It has following fields:

- Server version name `version`, a str. e.g. `1.15.2`, `1.17 Release Candidate 1`
- Server IP address `ip`, a str. e.g. `127.0.0.1`
- Server port `port`, an int. e.g. `25565`

Field(s) above might be None if the server is offline, or the related information has not been parsed

### Text Interaction

#### execute

``` python
def execute(self,
            text: str,
            *,
            encoding: Optional[str] = None) -> None
```

Execute a command by sending the command content to server's standard input stream

- Parameter *`text`*: The content of the command you want to send
- Keyword Parameter *`encoding`*: The encoding method for the text. Leave it empty to use the encoding method from the configure of MCDR

#### tell

``` python
def tell(self,
         player: str,
         text: Union[str, RTextBase],
         *,
         encoding: Optional[str] = None) -> None
```

Use command like `/tellraw` to send the message to the specific player

- Parameter *`player`*: The name of the player you want to tell
- Parameter *`text`*: the message you want to send to the player
- Keyword Parameter *`encoding`*: The encoding method for the text. Leave it empty to use the encoding method from the configure of MCDR

#### say

``` python
def say(self,
        text: Union[str, RTextBase],
        *,
        encoding: Optional[str] = None) -> None
```

Use command like `/tellraw @a` to send the message to broadcast the message in game

- Parameter *`text`*: the message you want to send
- Keyword Parameter *`encoding`*: The encoding method for the text. Leave it empty to use the encoding method from the configure of MCDR

#### broadcast

``` python
def broadcast(self,
              text: Union[str, RTextBase],
              *,
              encoding: Optional[str] = None) -> None
```

Broadcast the message in game and to the console

- Parameter *`text`*: the message you want to send
- Keyword Parameter *`encoding`*: The encoding method for the text. Leave it empty to use the encoding method from the configure of MCDR

#### reply

``` python
def reply(self,
          info: Info,
          text: Union[str, RTextBase],
          *,
          encoding: Optional[str] = None,
          console_text: Optional[Union[str, RTextBase]] = None) -> None
```

Reply to the source of the Info

If the Info is from a player then use tell to reply the player, otherwise if the Info is from the console use logger.info to output to the console. In the rest of the situations, the Info is not from a user, a IllegalCallError is raised

- Parameter *`info`*: the Info you want to reply to
- Parameter *`text`*: the message you want to send
- Keyword Parameter *`console_text`*: If it's specified, console_text will be used instead of text when replying to console
- Keyword Parameter *`encoding`*: The encoding method for the text

### Plugin Queries

#### get_plugin_metadata

``` python
def get_plugin_metadata(self, plugin_id: str) -> Optional[Metadata]
```

Return the metadata of the specified plugin, or None if the plugin doesn't exist

- Parameter *`plugin_id`*: The plugin id of the plugin to query metadata

#### get_plugin_file_path

``` python
def get_plugin_file_path(self, plugin_id: str) -> Optional[str]
```

Return the file path of the specified plugin, or None if the plugin doesn't exist

- Parameter *`plugin_id`*: The plugin id of the plugin to query file path

#### get_plugin_instance

``` python
def get_plugin_instance(self, plugin_id: str) -> Optional[Any]
```

Return the [entrypoint](../basic.md#entrypoint) module instance of the specific plugin, or None if the plugin doesn't exist

If the target plugin is a [solo plugin](../plugin_format.md#solo-plugin) and it needs to react to events from MCDR, it's quite important to use this instead of manually import the plugin you want, since it's the only way to make your plugin be able to access the same plugin instance to MCDR

- Parameter *`plugin_id`*: The plugin id of the plugin you want

Example:

``` python
## My API plugin with id my_api
def info_query_api(item):
    pass
```

``` python
## Another plugin that needs My API
server.get_plugin_instance('my_api').info_query_api(an_item)
```

#### get_plugin_list

``` python
def get_plugin_list(self) -> List[str]
```

Return a list containing all **loaded** plugin id like `["my_plugin", "another_plugin"]`

#### get_unloaded_plugin_list

``` python
def get_unloaded_plugin_list(self) -> List[str]
```

Return a list containing all **unloaded** plugin file path like `["plugins/MyPlugin.mcdr"]`

#### get_disabled_plugin_list

``` python
def get_disabled_plugin_list(self) -> List[str]
```

Return a list containing all **disabled** plugin file path like `["plugins/MyPlugin.mcdr.disabled"]`

#### get_all_metadata

``` python
def get_all_metadata(self) -> Dict[str, Metadata]
```

Return a dict containing metadatas of all loaded plugin with `(plugin_id, metadata)` as key-value pair

### Plugin Operations

**Notes**: All plugin manipulation will trigger a dependency check, which might cause unwanted plugin operations

#### load_plugin

``` python
def load_plugin(self, plugin_file_path: str) -> bool
```

Load a plugin from the given file path. Return if the plugin gets loaded successfully

- Parameter *`plugin_file_path`*: The file path of the plugin to load. Example: `plugins/my_plugin.py`

#### enable_plugin

``` python
def enable_plugin(self, plugin_file_path: str) -> bool
```

Enable an unloaded plugin from the given path. Return if the plugin gets enabled successfully

- Parameter *`plugin_file_path`*: The file path of the plugin to enable. Example: `plugins/my_plugin.py.disabled`

#### reload_plugin

``` python
def reload_plugin(self, plugin_id: str) -> Optional[bool]
```

Reload a plugin specified by plugin id. Return a bool indicating if the plugin gets reloaded successfully, or None if plugin not found

- Parameter *`plugin_id`*: The id of the plugin to reload. Example: `my_plugin`

#### unload_plugin

``` python
def unload_plugin(self, plugin_id: str) -> Optional[bool]
```

Unload a plugin specified by plugin id. Return a bool indicating if the plugin gets unloaded successfully, or None if plugin not found

- Parameter *`plugin_id`*: The id of the plugin to unload. Example: `my_plugin`

#### disable_plugin

``` python
def disable_plugin(self, plugin_id: str) -> Optional[bool]
```

Disable a plugin specified by plugin id. Return a bool indicating if the plugin gets disabled successfully, or None if plugin not found

- Parameter *`plugin_id`*: The id of the plugin to disable. Example: `my_plugin`

#### refresh_all_plugins

``` python
def refresh_all_plugins(self) -> None
```

Reload all plugins, load all new plugins and then unload all removed plugins

#### refresh_changed_plugins

``` python
def refresh_all_plugins(self) -> None
```

Reload all changed plugins, load all new plugins and then unload all removed plugins

#### dispatch_event

``` python
def dispatch_event(self, event: PluginEvent, args: Tuple[Any, ...]) -> None
```

Dispatch an event to all loaded plugins

The event will be immediately dispatch if it's on the task executor thread, or gets enqueued if it's on other thread

- Parameter *`event`*: The event to dispatch. It need to be a `PluginEvent` instance. For simple usage, you can create a `LiteralEvent` instance for this argument
- Parameter *`args`*: The argument that will be used to invoke the event listeners. An ServerInterface instance will be automatically added to the beginning of the argument list
- Parameter *`on_executor_thread`*: By default the event will be dispatched in a new task in task executor thread. If it's set to false. The event will be dispatched immediately

**Note**: You cannot dispatch an event with the same event id to any MCDR built-in event

Example:

For the event dispatcher plugin

``` python
server.dispatch_event(LiteralEvent('my_plugin.my_event'), (1, 'a'))
```

In the event listener plugin

``` python
def do_something(server: PluginServerInterface, int_data: int, str_data: str):
    pass

server.register_event_listener('my_plugin.my_event', do_something)
```

### Permission

#### get_permission_level

``` python
def get_permission_level(self, obj: Union[str, Info, CommandSource]) -> int
```

Return an int indicating permission level number the given object has

The object could be a str indicating the name of a player, an `Info` instance or a command source

- Parameter *`obj`*: The object your are querying

It raises `TypeError` if the type of the given object is not supported for permission querying

#### set_permission_level

``` python
def set_permission_level(self, player: str, value: Union[int, str]) -> None
```

Set the permission level of the given player. It raises `TypeError` if the value parameter doesn't proper represent a permission level

- Parameter *`player`*: The name of the player that you want to set his/her permission level
- Parameter *`value`*: The target permission level you want to set the player to. It can be an int or a str as long as it's related to the permission level. Available examples: `1`, `'1'`, `'user'`

### Command

#### get_plugin_command_source

``` python
get_plugin_command_source(self) -> PluginCommandSource
```

Return a simple plugin command source for e.g. command execution

It's not player or console, it has maximum permission level, it use [`logger`](#logger) for replying

#### execute_command

``` python
def execute_command(self, command: str, source: CommandSource = None) -> None
```

Execute a single command using the command system of MCDR

- Parameter *`command`*: The command you want to execute
- Parameter *`source`*: The command source that is used to execute the command. If it's not specified MCDR will use [`get_plugin_command_source`](#get-plugin-command-source) as fallback command source

### Preference

#### get_preference

``` python
def get_preference(self, obj: Union[str, CommandSource]) -> PreferenceItem
```

Return the MCDR preference of the given object. The object can be a str indicating the name of a player, or a command source. For command source, only `PlayerCommandSource` and `ConsoleCommandSource` are supported

- Parameter *`obj`*: The object to querying preference

It raises `TypeError` if the type of the given object is not supported for preference querying

### Misc

#### is_on_executor_thread

``` python
def is_on_executor_thread(self) -> bool
```

Return if the current thread is the task executor thread

Task executor thread is the main thread to parse messages and trigger listeners where some ServerInterface APIs are required to be invoked on

#### rcon_query

``` python
def rcon_query(self, command: str) -> Optional[str]
```

Send command to the server through rcon connection. Return the result that server returned from rcon. Return None if rcon is not running or rcon query failed

- Parameter *`command`*: The command you want to send to the rcon server

#### get_mcdr_language

``` python
def get_mcdr_language(self) -> str
```

Return the current language MCDR is using

#### get_mcdr_config

``` python
get_mcdr_config(self) -> dict
```

Return the current config of MCDR as a dict

#### schedule_task

``` python
def schedule_task(self,
                  callable_: Callable[[], Any],
                  *,
                  block: bool = False,
                  timeout: Optional[float] = None) -> None
```

Schedule a task to be run in task executor thread

- Parameter *`callable_`*: The callable object to be run. It should accept 0 parameter
- Keyword Parameter *`block`*: If blocks until the callable finished execution
- Keyword Parameter *`timeout`*: The timeout of the blocking operation if `block=True`
