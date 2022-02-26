/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  docsSidebar: [
    {
      collapsible: false,
      type: 'category',
      label: 'Docs',
      link: {
        type: 'doc',
        id: 'index',
      },
      items: [
        'quick_start',
        'configure',
        'command',
        'permission',
        'preference',
        {
          type: 'category',
          label: 'Plugin Development',
          link: {
            type: 'doc',
            id: 'plugin_dev/index',
          },
          items: [
            'plugin_dev/basic',
            'plugin_dev/metadata',
            'plugin_dev/plugin_format',
            'plugin_dev/event',
            'plugin_dev/command',
            'plugin_dev/api',
            'plugin_dev/watchdog',
            'plugin_dev/cli',
            'plugin_dev/plugin_catalogue',
            'plugin_dev/dev_tips',
            {
              type: 'category',
              label: 'Classes',
              link: {
                type: 'doc',
                id: 'plugin_dev/classes/index',
              },
              items: [
                'plugin_dev/classes/ServerInterface',
                'plugin_dev/classes/PluginServerInterface',
                'plugin_dev/classes/Info',
                'plugin_dev/classes/CommandSource',
                'plugin_dev/classes/CommandError'
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Customize',
          link: {
            type: 'doc',
            id: 'customize/index',
          },
          items: [
            'customize/handler',
            'customize/reactor',
          ],
        },
        {
          type: 'category',
          label: 'Migrate Guide',
          link: {
            type: 'doc',
            id: 'migrate/index',
          },
          items: [
            'migrate/from_0.x_to_1.x',
            'migrate/from_1.x_to_2.x',
          ],
        },
      ],
    },
  ],
};
