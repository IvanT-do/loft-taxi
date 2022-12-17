import TextField from "../TextField";

export default function FormField({meta, input, ...other}){
    const hasError = meta.touched && !meta.valid;
    return (
        <TextField
            {...input}
            {...other}
            error={hasError}
            helperText={hasError ? meta.error : ""}
        />
    );
}
