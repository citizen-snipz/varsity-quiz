import React from "react"
import { Formik, Form, useField, FieldArray } from "formik"
import CategoryTag from "./CategoryTag"
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
const AddQuestionForm = ({ categories, requestApi }) => {
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
          categories: []
        }}
        validationSchema={Yup.object({
          question: Yup.string().required("Required"),
          answer: Yup.string().required("Required"),
          year: Yup.number().required("Required"),
          match: Yup.string().required("Required"),
          bonus: Yup.boolean(),
          categories: Yup.array()
            // .oneOf(
            //   ["history", "math", "science", "vocabulary"],
            //   "Invalid Category"
            // )
            .required("Required")
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          console.log("submitting")
          const post = await requestApi(
            "post",
            "/questions/addQuestion",
            values
          )
          setSubmitting(false)
          resetForm()
        }}
      >
        {(values) => (
          <Form className="addQuestionForm">
            <MyTextInput
              className="long-input input-wrapper"
              label="Question"
              name="question"
              type="text"
              placeholder="Question"
            />

            <MyTextInput
              className="long-input input-wrapper"
              label="Answer"
              name="answer"
              type="text"
              placeholder="Answer"
            />

            <MyTextInput
              className="input-wrapper"
              label="Year"
              name="year"
              type="number"
              placeholder="Year"
            />

            <MyTextInput
              className="input-wrapper"
              label="Match"
              name="match"
              type="match"
              placeholder="ex: 'QF1' for Quarter Finals round 1"
            />

            <FieldArray
              name="categories"
              render={(arrayHelpers) => (
                <div>
                  {categories.map((category, i) => (
                    <CategoryTag
                      {...values}
                      {...arrayHelpers}
                      key={i}
                      index={i}
                      name={category}
                    />
                  ))}
                </div>
              )}
            />

            {/* <MySelect
            className="input-wrapper"
            label="Category"
            name="categories"
          >
            <option value="">Select a category</option>
            <option value="history">History</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="vocabulary">Vocabulary</option>
          </MySelect> */}

            <MyCheckbox className="input-wrapper" name="bonus">
              Check the box if this is a bonus question
            </MyCheckbox>

            <button className="input-wrapper" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default AddQuestionForm
