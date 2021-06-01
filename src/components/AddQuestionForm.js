import React from "react"
import { Formik, Form, useField } from "formik"
import * as Yup from "yup"

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" })
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

// And now we can use these
const AddQuestionForm = () => {
  return (
    <>
      <h1>Add Question</h1>
      <Formik
        initialValues={{
          question: "",
          answer: "",
          year: "",
          match: "",
          bonus: false, // added for our checkbox
          category: "" // added for our select
        }}
        validationSchema={Yup.object({
          question: Yup.string().required("Required"),
          answer: Yup.string().required("Required"),
          year: Yup.string().required("Required"),
          match: Yup.string().required("Required"),
          bonus: Yup.boolean(),
          category: Yup.string()
            .oneOf(
              ["history", "math", "science", "vocabulary"],
              "Invalid Job Type"
            )
            .required("Required")
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        <Form className="addQuestionForm">
          <MyTextInput
            label="Question"
            name="question"
            type="text"
            placeholder="Question"
          />

          <MyTextInput
            label="Answer"
            name="answer"
            type="text"
            placeholder="Answer"
          />

          <MyTextInput
            label="Year"
            name="year"
            type="text"
            placeholder="Year"
          />

          <MyTextInput
            label="Match"
            name="match"
            type="match"
            placeholder="ex: 'QF1' for Quarter Finals round 1"
          />

          <MySelect label="Category" name="category">
            <option value="">Select a category</option>
            <option value="history">History</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="vocabulary">Vocabulary</option>
          </MySelect>

          <MyCheckbox name="bonus">
            Check the box if this is a bonus question
          </MyCheckbox>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  )
}

export default AddQuestionForm
