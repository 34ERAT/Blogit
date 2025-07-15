import { Stack, TextField } from "@mui/material";
import { isEmpty } from "../../utils/textField";
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
          value={values.title}
          onChange={handleChange}
          label="title "
          size="small"
          fullWidth
          required
        />
        <TextField
          name="synopsis"
          error={values.synopsis == "" ? true : false}
          value={values.synopsis}
          onChange={handleChange}
          label="synopsis "
          type="text"
          size="small"
          required
          fullWidth
        />
      </Stack>
      <TextField
        name="content"
        error={values.content == "" ? true : false}
        value={values.content}
        onChange={handleChange}
        multiline
        rows={16}
        label="Content in markdow"
        fullWidth
        required
      />
    </Stack>
  );
}

export default BlogInput;
