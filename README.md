## Concept Space Traversal Plugin
![2023-08-25 11 33 40](https://github.com/jacobmarks/concept-space-traversal-plugin/assets/12500356/1e52624a-67f8-48f9-8dcf-99f4a0568e7c)

This plugin allows you to "traverse" the concept space of a similarity index
by adding text prompts (with configurable strength) to a base image.

It demonstrates how to do the following:

- use Python and JS in the same plugin
- create a `Panel` with custom components
- query dataset properties from JS
- add an SVG icon to the UI

**Note:** This plugin requires a similarity index that supports prompts (i.e.
embeds text and images) to be present on the dataset. You can create one with:

```py
import fiftyone as fo
import fiftyone.brain as fob

dataset = fo.load_dataset("my_dataset")
fob.compute_similarity(
    dataset,
    brain_key="my_brain_key",
    model_name="clip-vit-base32-torch",
    metric="cosine",
    )
```

## Installation

```shell
fiftyone plugins download https://github.com/jacobmarks/concept-space-traversal-plugin
```

Refer to the [main README](https://github.com/voxel51/fiftyone-plugins) for
more information about managing downloaded plugins and developing plugins
locally.

## Operators

### `open_traversal_panel`

- Opens the concept space traversal panel on click
- Only activated when the dataset has a similarity index

### `traverser`

- Runs the Traverser on the dataset
