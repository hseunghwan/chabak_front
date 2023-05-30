import React, { useEffect } from "react";
import FormContainer from "src/components/FormContainer";

export default function Error() {
    useEffect(() => {
        window.location.reload();
    }, []); // useEffect will run once when component is mounted
    return <FormContainer title=" "> </FormContainer>;
}
