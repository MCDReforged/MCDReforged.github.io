---
title: Plugin Format
sidebar_position: 3
toc_max_heading_level: 6
---

There are 3 types of valid format of a MCDR plugin, each of them has its own advantages and disadvantages depending on the user cases

See [this repository](https://github.com/MCDReforged/MCDReforged-ExamplePlugin) for examples of all plugin formats

Plugin format inheriting tree:

- Solo Plugin

- Multi file Plugin (Abstract)
  - Packed Plugin
  - Directory Plugin

## Solo Plugin

Solo Plugin consists of a single python `.py` source file. It's the plugin format which aims for easy to write and rapid development

Being restricted with the one-file-only file format, some features are missing in solo plugin:

1. Python requirement check is not supported
1. Directly import from other plugin is not supported. Other plugin can only use [`get_plugin_instance`](classes/ServerInterface.md#get_plugin_instance) to access your plugin
1. Cannot be added to MCDR plugin catalogue

When you only want to create a simple plugin as fast as possible, creating a solo plugin is always a good choice

## Multi file Plugin

Multi file plugin is the collective name for the following two plugin format, [packed plugin](#packed-plugin) and [directory plugin](#directory-plugin)

The biggest difference between multi file plugin and solo plugin is that, it can consist of multiple files, rather than being limited into 1 single `.py` file. Therefore, more features are supported in a multi file plugin which make it easier to create a general plugin

## Packed Plugin

Packed plugin is a zip type compressed file with file extension name `.mcdr` or `.pyz`. It's the recommended plugin format for distribution

A minimum packed plugin consists of the following files at its zip root

- `mcdreforged.plugin.json`, contains the metadata of the plugin
- a valid python package with your plugin id

Here's an example file tree of a minimum packed plugin with plugin id
`my_plugin`:

``` text
MyPlugin.mcdr/
    my_plugin/
        __init__.py
    mcdreforged.plugin.json
```

Optionally, a packed plugin can have some other useful files that will be recognized by MCDR:

- `requirements.txt`, indicating the python package requirement of your plugin. It'll be checked before plugin loading
- `lang/`, a folder storing translation files in json (`.json`) or yaml (`.yml`) format. MCDR will automatically load and register translation files in this folder

You can include any other files or folders inside your packed plugin. You can access them via [`open_bundled_file`](classes/ServerInterface.md#open_bundled_file) method in [`ServerInterface`](classes/ServerInterface.md)

Here's an example file tree of a valid packed plugin with more possible files:

``` text
MyPlugin.mcdr/
    my_plugin/
        __init__.py
        my_lib.py
    my_data/
        default_config.json
        some_data.txt
    lang/
        en_us.json
        zh_cn.json
    mcdreforged.plugin.json
    requirements.txt
```

In addition to `.mcdr` file extension, the python [zip app](https://docs.python.org/3/library/zipapp.html) file extension `.pyz` is also valid for a packed plugin.

Although it's not as obvious to be a MCDR plugin as `.mcdr`, but for those plugins who provide the functionality to run in command line outside MCDR environment, using `.pyz` extension can explicitly show that they support command line operation

## Directory Plugin

Directory plugin has exactly the same file structure as [packed plugin](#packed-plugin). The only difference is that all files of a directory plugins are inside a directory instead of a `.mcdr` zip file

Directory plugin is mostly used for debug purpose inside the plugin directory of MCDR

Here's an example file tree of a directory plugin:

``` text
MyPlugin/
    my_plugin/
        __init__.py
        my_lib.py
    mcdreforged.plugin.json
    requirements.txt
```

Directory plugin will always be treated as "modified" during `!!MCDR reload plugin` [hot reload](../command.md#hot-reloads) command
