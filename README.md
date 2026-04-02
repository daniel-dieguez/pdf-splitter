# 📄 PDF Splitter Pro

Aplicación web moderna para **dividir, reorganizar y descargar archivos PDF** de forma interactiva.
Permite manipular páginas fácilmente mediante **Drag & Drop**, ofreciendo una experiencia fluida, rápida y profesional.

---

## 🚀 Características

* 📂 Subir archivos PDF
* 📄 Separación automática por páginas
* 🧩 Reordenar páginas con Drag & Drop
* ➕ Agregar múltiples PDFs
* ❌ Eliminar páginas individuales
* 📥 Descargar PDF final ordenado
* ⚡ Interfaz rápida y responsiva
* 🧠 Optimización de memoria usando `Blob URLs`

---

## 🛠️ Tecnologías utilizadas

* ⚛️ React.js (Next.js)
* 🟦 TypeScript
* 📦 pdf-lib
* 🎯 @dnd-kit (Drag & Drop)
* 🎨 Tailwind CSS

---

## 📸 Preview

*Aquí puedes agregar screenshots de tu app*

```
![preview](./public/preview.png)
```

---

## ⚙️ Instalación

Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
```

Entra al proyecto:

```bash
cd tu-repo
```

Instala dependencias:

```bash
npm install
```

Ejecuta el proyecto:

```bash
npm run dev
```

---

## 📂 Estructura del proyecto

```
src/
│── components/
│   └── SortablePage.tsx
│
│── app/
│   └── FunctionPDFS.tsx
│
│── utils/
│   └── Loading.tsx
```

---

## 🧩 Funcionalidades principales

### 🔹 División de PDF

Cada archivo se divide en páginas individuales usando `pdf-lib`.

### 🔹 Drag & Drop

Reordenamiento dinámico con `@dnd-kit`.

### 🔹 Manejo de memoria

Uso de:

```js
URL.createObjectURL()
URL.revokeObjectURL()
```

para evitar fugas de memoria.

---

## ⚠️ Consideraciones técnicas

* Los `Blob URLs` se liberan correctamente para evitar memory leaks.
* Se evita SSR para componentes que usan APIs del navegador.
* Optimizado para evitar errores de hydration en Next.js.

---

## 📌 Mejoras futuras

* 🖼️ Preview en canvas (react-pdf)
* 📱 Mejor experiencia móvil
* ☁️ Subida y almacenamiento en la nube
* 🔐 Autenticación de usuarios
* 📊 Historial de PDFs procesados

---

## 👨‍💻 Autor

**Daniel Diéguez**
📧 [danguez2001@gmail.com](mailto:danguez2001@gmail.com)

---

## ⭐ Contribuciones

¡Las contribuciones son bienvenidas!
Puedes hacer un fork del proyecto y enviar un pull request.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
