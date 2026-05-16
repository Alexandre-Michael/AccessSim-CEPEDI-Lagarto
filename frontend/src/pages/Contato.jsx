import { useState } from 'react';

export default function Contato() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: 'demo',
    message: '',
  });

async function handleSubmit(event) {
  event.preventDefault();

  try {
    const response = await fetch('http://127.0.0.1:8000/api/leads/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Lead enviado com sucesso!');
      console.log(data);
    } else {
      alert('Erro ao enviar lead.');
      console.error(data);
    }
  } catch (error) {
    alert('Erro de conexão com o backend.');
    console.error(error);
  }
}

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <main>
      <h1>Contato</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Nome
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Telefone
          <input name="phone" value={form.phone} onChange={handleChange} />
        </label>

        <label>
          Empresa
          <input name="company" value={form.company} onChange={handleChange} />
        </label>

        <label>
          Interesse
          <select name="interest" value={form.interest} onChange={handleChange}>
            <option value="demo">Agendar demo</option>
            <option value="piloto">Participar do piloto</option>
            <option value="contato">Contato geral</option>
          </select>
        </label>

        <label>
          Mensagem
          <textarea name="message" value={form.message} onChange={handleChange} />
        </label>

        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}