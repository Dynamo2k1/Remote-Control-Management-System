import yaml

def parse_yaml(file_stream):
    try:
        # Parse the YAML file
        config = yaml.safe_load(file_stream)
        print(f"YAML Parsed: {config}")  # Debugging output

        # Ensure the YAML structure contains 'devices' and is a list
        if not isinstance(config, dict):
            raise ValueError("YAML should be a dictionary.")

        if "devices" not in config:
            raise ValueError("Missing 'devices' key in YAML.")

        # Ensure 'devices' is a list
        if not isinstance(config["devices"], list):
            raise ValueError("'devices' should be a list.")

        # Validate each device in the list
        for device in config["devices"]:
            if not isinstance(device, dict):
                raise ValueError(f"Invalid device format: {device}")
            required_keys = ["ip", "username", "password"]
            for key in required_keys:
                if key not in device:
                    raise ValueError(f"Missing '{key}' in device: {device}")

        return config

    except yaml.YAMLError as e:
        raise ValueError(f"YAML Parsing error: {e}")
