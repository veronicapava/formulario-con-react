import "./App.scss"
import Field from "./components/Field"
import Submit from "./components/Submit"
import Form from "./components/Form"
import Textarea from "./components/Textarea"
import Select from "./components/Select"
import { useRef } from "react"

const App = () => {

  const form = useRef()

  const submit = e => {
    e.preventDefault()
    const f = form.current

    const data = {
      fullname: f.fullname.value,
      mail: f.mail.value,
      age: f.age.value,
      ranking: f.ranking.value,
      obs: f.obs.value,
      country: f.country.value,
      active: f.active.checked,
    }

    fetch("http://localhost:3001/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(respose => {
        console.log(respose)
        f.reset()
        alert("Tus datos se han guardado")
      })
      .catch(e => console.error(e))
  }

  return (
    <Form submit={submit} formRef={form}>
      <Field label="Nombres" name="fullname" type="text" value="" />
      <Field label="Correo electrónico" name="mail" type="email" value="" />
      <Field label="Edad" name="age" type="number" value="" />
      <Field label="Calificación" name="ranking" type="range" value="" />
      <Textarea label="Observaciones" name="obs" value="" />
      <Select name="country" label="País" options={
        [{ val: "co", content: "Colombia" },
        { val: "pe", content: "Perú" },
        { val: "bo", content: "Bolivia" },
        { val: "me", content: "México" }]
      } />
      <Field label="¿Activo?" name="active" type="checkbox" checked={true} />
      <Submit value="Guardar" />
    </Form>
  )

}

export default App;
