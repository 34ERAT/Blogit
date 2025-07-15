import { Stack, TextField } from "@mui/material";
import { isEmpty, isRequired } from "../../utils/textField";
import type { CreateBlog } from "../../types";

type Props = {
  onChange: (data: CreateBlog) => void;
  // defaultValue?: CreateBlog;
  values: CreateBlog;
};
function BlogInput({ values, onChange }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    onChange({ ...values, [name]: value });
  }

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction={"row"}>
        <TextField
          name="title"
          error={isEmpty(values.title)}
          helperText={isRequired(values.title)}
          value={values.title}
          onChange={handleChange}
          label="title "
        />
        <TextField
          name="synopsis"
          error={values.synopsis == "" ? true : false}
          helperText={values.synopsis == "" ? "field is required" : false}
          value={values.synopsis}
          onChange={handleChange}
          label="synopsis "
          type="text"
          fullWidth
        />
      </Stack>
      <TextField
        name="content"
        error={values.content == "" ? true : false}
        helperText={values.content == "" ? "field is required" : false}
        value={values.content}
        onChange={handleChange}
        multiline
        rows={15}
        label="Content in markdow"
        fullWidth
      />
    </Stack>
  );
}

export default BlogInput;
