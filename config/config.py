import yaml

class Config:
    def __init__(self):
        secrets_file = "D:\\account_info\\account_info.yaml.txt"
        with open(secrets_file) as f:
            self.account_info = yaml.safe_load(f)

        # basic_info_file = "config\\evan_basic_info.yaml"
        # with open(basic_info_file) as f:
        #     self.evan_basic_info = yaml.safe_load(f)