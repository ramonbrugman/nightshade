## Using Colors

All colors should be declared using the [Accoutrement](https://github.com/oddbird/accoutrement-color) `color()` function, and in most cases specify a color name from our map, e.g `background: color(dark-background);`. Avoid using explicit HEX values.

Colors are defined in our [color config](https://github.com/CasperSleep/nightshade-core/blob/v2.0.0-dev/src/color/lib/config.json) JSON file, which is imported and converted to a Sass map. Any global colors, or colors shared by multiple modules should be added to this object. Run `gulp colors-config` to re-generate the map.

One-off colors that are specific to a given module should be defined in a `_config.scss` partial, that is imported at to the top of that module's `_index.scss`. These should also be declared using the `color()` function, e.g `color: color($custom-color);`.

Color stacks are defined by mixing a base color with another color, and defining the interval steps for each shade in the stack (see our [color helpers](https://github.com/CasperSleep/nightshade-core/blob/v2.0.0-dev/src/color/_helpers.scss)). Avoid using stack values explicitly unless there is no pre-mapped color name suitable, e.g. use `color(light-background)` rather than `color(gray--light9)`.
