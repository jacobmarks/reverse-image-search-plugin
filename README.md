## Reverse Image Search Plugin

This plugin allows you to search your dataset for images that are similar to a
given image. It uses a similarity index to find similar images, which you can
specify. 

You can search by URL or by uploading an image. The plugin will display the
image you searched for in the panel, and you can run the reverse image search
on that image by clicking the "Search" button.

It demonstrates how to do the following:

- use Python and JS in the same plugin
- create a `Panel` with custom components
- query dataset properties from JS
- add an SVG icon to the UI
- display images in the UI
- use a drag-and-drop component

**Note:** This plugin requires a similarity index to be present on the dataset. 
You can create one with:

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
fiftyone plugins download https://github.com/jacobmarks/reverse-image-search-plugin
```

Refer to the [main README](https://github.com/voxel51/fiftyone-plugins) for
more information about managing downloaded plugins and developing plugins
locally.

## Operators

### `open_reverse_image_search_panel`

- Opens the reverse image search panel on click
- Only activated when the dataset has a similarity index

### `reverse_search_image`

- Runs the reverse image search on the dataset with the given image
