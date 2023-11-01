## Reverse Image Search Plugin ⏪ 🖼️ 🔎

![search_from_url](https://github.com/jacobmarks/reverse-image-search-plugin/assets/12500356/cc2df982-891a-4cef-967e-67d583134d25)

This plugin allows you to search your dataset for images that are similar to a
given image. It uses a similarity index to find similar images, which you can
specify. 

You can search by URL or by uploading an image. The plugin will display the
image you searched for in the panel, and you can run the reverse image search
on that image by clicking the "Search" button.

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

To run reverse image search using Milvus instead of the default similarity
index, you need to install Milvus:

```shell
pip install pymilvus
```

start the Milvus Docker server:

```bash
wget https://github.com/milvus-io/milvus/releases/download/v2.2.11/milvus-standalone-docker-compose.yml -O docker-compose.yml
sudo docker compose up -d
```

And add `backend="milvus"` to the `compute_similarity` call!

## Watch On Youtube
[![Video Thumbnail](https://img.youtube.com/vi/ZlUD1xcZxo4/0.jpg)](https://www.youtube.com/watch?v=ZlUD1xcZxo4&list=PLuREAXoPgT0RZrUaT0UpX_HzwKkoB-S9j&index=9)


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
