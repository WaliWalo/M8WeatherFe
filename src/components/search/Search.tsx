import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { ISearchProps } from "../../types";

export default function Search(props: ISearchProps) {
  return (
    <div style={{ position: "absolute", top: "50%", left: "37%" }}>
      <Form inline onSubmit={(e) => props.handleSubmit(e)}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={props.input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.handleOnChange(e)
          }
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
}
