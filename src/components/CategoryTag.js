import React, { useState, useEffect } from "react"
import { Field } from "formik"

function CategoryTag(props) {
  const { remove, push, index, values, name } = props
  const [isSelected, setIsSelected] = useState(values.categories.includes(name))

  useEffect(() => {
    if (isSelected) push(name)
    if (!isSelected) remove(values.categories.indexOf(name))
  }, [isSelected])

  useEffect(() => {
    setIsSelected(values.categories.includes(name))
  }, [values.categories])
  return (
    <Field
      type="button"
      name={name}
      value={name}
      className={isSelected ? "selected" : ""}
      onClick={() => {
        setIsSelected(!isSelected)
      }}
    />
  )
}

export default CategoryTag
