import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import * as fos from "@fiftyone/state";
import { registerComponent, PluginComponentType } from "@fiftyone/plugins";
import { useOperatorExecutor } from "@fiftyone/operators";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Input,
  Grid,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

const InputTypes = {
  URL: "URL",
  FILE: "FILE",
};

export default function ReverseImageSearchPanel() {
  const validBrainRuns = getValidBrainRuns();
  const [brainRunValue, setBrainRunValue] = useState(validBrainRuns[0]);
  const [inputURL, setInputURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputType, setInputType] = useState(InputTypes.URL);
  const [numResults, setNumResults] = useState(50);

  const handleInputChange = (event, newInputType) => {
    setInputType(newInputType);
  };

  const operatorExecutor = useOperatorExecutor(
    "@jacobmarks/reverse_image_search/reverse_search_image"
  );

  const executeSearch = () => {
    let payload = {
      index: brainRunValue,
      num_results: numResults,
    };

    if (inputType === 'URL') {
      payload['url'] = inputURL;
      operatorExecutor.execute(payload);
    } else if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        payload['file_data'] = reader.result.split(',')[1];
        operatorExecutor.execute(payload);
      };
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setSelectedFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (inputType === InputTypes.URL && inputURL) {
      setImagePreview(inputURL);
      setSelectedFile(null);
    }
    if (selectedFile) {
      setImagePreview(selectedFile.preview);
      setInputURL("");
    }
  }, [inputURL, selectedFile, inputType]);

  return (
    <Box p={4}>
      <Typography variant="h6">Reverse Image Search</Typography>

      <Box display="flex" justifyContent="space-between">
        <FormControl style={{ width: "45%" }} margin="normal">
          <InputLabel id="brain-run-select-label">Brain Run</InputLabel>
          <Select
            value={brainRunValue}
            label="Brain Run"
            onChange={(e) => setBrainRunValue(e.target.value)}
          >
            {validBrainRuns.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ width: "45%" }} margin="normal">
          <InputLabel htmlFor="num-samples">Number of Samples</InputLabel>
          <Input
            id="num-samples"
            type="number"
            value={numResults}
            onChange={(e) => setNumResults(parseInt(e.target.value, 10))}
          />
        </FormControl>
      </Box>
      <Box mt={4}>
        {" "}
        <Typography variant="h6">Select Image</Typography>
      </Box>

      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <ToggleButtonGroup
            value={inputType}
            exclusive
            onChange={handleInputChange}
          >
            <ToggleButton value={InputTypes.URL}>URL</ToggleButton>
            <ToggleButton value={InputTypes.FILE}>File</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs>
          {inputType === InputTypes.URL && (
            <TextField
              fullWidth
              label="Input URL"
              variant="outlined"
              value={inputURL}
              onChange={(e) => setInputURL(e.target.value)}
            />
          )}
          {inputType === InputTypes.FILE && (
            <Box
              {...getRootProps()}
              sx={{
                padding: 2,
                border: "2px dashed gray",
                minHeight: "56px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input {...getInputProps()} />
              <Typography>
                {isDragActive
                  ? "Drop the image file here ..."
                  : "Drag 'n' drop a file here, or click to select one"}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {imagePreview && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <img
            src={imagePreview}
            alt="input"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        </Box>
      )}

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button variant="contained" onClick={executeSearch}>Search</Button>
      </Box>
    </Box>
  );
}

const ReverseImageSearchIcon = ({ size = 41, style = {} }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="15 -20 128 160"
      x="0px"
      y="0px"
      width={size}
      height={size}
    >
      <path
        fill="white"
        d="M30,37H14a4.00427,4.00427,0,0,0-4,4V52a4.00427,4.00427,0,0,0,4,4H30a4.00427,4.00427,0,0,0,4-4V41A4.00427,4.00427,0,0,0,30,37ZM20.63074,52l2.09778-3.31787L26.04663,52Zm3.15833-7.91406a1.9997,1.9997,0,0,0-3.10449.34521L15.89838,52H14V41H30l.0025,9.29938Z"
      />
      <path
        fill="white"
        d="M58,37H42a4.00427,4.00427,0,0,0-4,4V52a4.00427,4.00427,0,0,0,4,4H58a4.00427,4.00427,0,0,0,4-4V41A4.00427,4.00427,0,0,0,58,37ZM48.63074,52l2.09778-3.31787L54.04663,52Zm3.15833-7.91406a1.9997,1.9997,0,0,0-3.10449.34521L43.89838,52H42V41H58l.0025,9.29938Z"
      />
      <path
        fill="white"
        d="M86,37H70a4.00427,4.00427,0,0,0-4,4V52a4.00427,4.00427,0,0,0,4,4H86a4.00427,4.00427,0,0,0,4-4V41A4.00427,4.00427,0,0,0,86,37ZM76.63074,52l2.09778-3.31787L82.04663,52Zm3.15833-7.91406a1.9997,1.9997,0,0,0-3.10449.34521L71.89838,52H70V41H86l.0025,9.29938Z"
      />
      <path
        fill="white"
        d="M114,37H98a4.00427,4.00427,0,0,0-4,4V52a4.00427,4.00427,0,0,0,4,4h16a4.00427,4.00427,0,0,0,4-4V41A4.00427,4.00427,0,0,0,114,37Zm-9.36926,15,2.09778-3.31787L110.04663,52Zm3.15833-7.91406a1.9997,1.9997,0,0,0-3.10449.34521L99.89838,52H98V41h16l.0025,9.29938Z"
      />
      <path
        fill="white"
        d="M14,33H96a4.00427,4.00427,0,0,0,4-4V25a4.00427,4.00427,0,0,0-4-4H14a4.00427,4.00427,0,0,0-4,4v4A4.00427,4.00427,0,0,0,14,33Zm0-8H96l.00293,4H14Z"
      />
      <path
        fill="white"
        d="M109.85449,31.9375a5.58283,5.58283,0,0,0,2.92523-.82971l1.8736,1.44543a2,2,0,1,0,2.44336-3.167l-1.86188-1.43634a5.62437,5.62437,0,1,0-5.38031,3.98761Zm0-7.25a1.625,1.625,0,1,1-1.625,1.625A1.62657,1.62657,0,0,1,109.85449,24.6875Z"
      />
      <circle fill="white" cx="64" cy="90" r="3" />
      <path
        fill="white"
        d="M30,60H14a4.00427,4.00427,0,0,0-4,4V75h4V64H30l.0025,9.29938-6.21344-6.21344a1.9997,1.9997,0,0,0-3.10449.34521L15.89838,75h4.73236l2.09778-3.31787L26.04663,75H34V64A4.00427,4.00427,0,0,0,30,60Z"
      />
      <path
        fill="white"
        d="M58,60H42a4.00427,4.00427,0,0,0-4,4V75h4V64H58l.0025,9.29938-6.21344-6.21344a1.9997,1.9997,0,0,0-3.10449.34521L43.89838,75h4.73236l2.09778-3.31787L54.04663,75H62V64A4.00427,4.00427,0,0,0,58,60Z"
      />
      <path
        fill="white"
        d="M86,60H70a4.00427,4.00427,0,0,0-4,4V75h4V64H86l.0025,9.29938-6.21344-6.21344a1.9997,1.9997,0,0,0-3.10449.34521L71.89838,75h4.73236l2.09778-3.31787L82.04663,75H90V64A4.00427,4.00427,0,0,0,86,60Z"
      />
      <path
        fill="white"
        d="M118,64a4.00427,4.00427,0,0,0-4-4H98a4.00427,4.00427,0,0,0-4,4V75h4V64h16l.0025,9.29938-6.21344-6.21344a1.9997,1.9997,0,0,0-3.10449.34521L99.89838,75h4.73236l2.09778-3.31787L110.04663,75H118Z"
      />
      <path
        fill="white"
        d="M124,13H4a4.00427,4.00427,0,0,0-4,4V97a4.00427,4.00427,0,0,0,4,4H55v10H46.5a2,2,0,0,0,0,4h35a2,2,0,0,0,0-4H73V101h51a4.00427,4.00427,0,0,0,4-4V17A4.00427,4.00427,0,0,0,124,13ZM69,111H59V101H69ZM4,97V83h97.667a2,2,0,0,0,0-4H4V17H124l.00226,62H113.667a2,2,0,1,0,0,4h10.33545l.00049,14Z"
      />
    </svg>
  );
};

registerComponent({
  name: "ReverseImageSearchPanel",
  label: "Reverse Image Search",
  component: ReverseImageSearchPanel,
  type: PluginComponentType.Panel,
  activator: traversalActivator,
  Icon: () => (
    <ReverseImageSearchIcon size={"1rem"} style={{ marginRight: "0.5rem" }} />
  ),
});

function getValidBrainRuns() {
  const dataset = useRecoilValue(fos.dataset);
  const brainMethods = dataset.brainMethods;
  const validBrainRuns = [];
  for (let i = 0; i < brainMethods.length; i++) {
    const brConfig = brainMethods[i].config;
    if (brConfig.cls.includes("Similarity")) {
      validBrainRuns.push(brainMethods[i].key);
    }
  }
  return validBrainRuns;
}

function traversalActivator() {
  const dataset = useRecoilValue(fos.dataset);
  const brainMethods = dataset.brainMethods;
  for (let i = 0; i < brainMethods.length; i++) {
    const brConfig = brainMethods[i].config;
    if (brConfig.cls.includes("Similarity")) {
      return true;
    }
  }
  return false;
}
