"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaShoppingCart,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaStore,
  FaUsers,
  FaBlog,
  FaPhone,
} from "react-icons/fa";

const WHATSAPP_NUMBER = "50683421619";

interface Producto {
  name: string;
  desc: string;
  img: string;
}

interface ItemCarrito {
  id: number;
  name: string;
  opcion: "Porción" | "Completo";
  cantidad: number;
  precioUnitario: number;
  total: number;
}

export default function Home() {
  // 📌 Lista de postres
  const listaPostres: Producto[] = [
    { name: "Flan de Coco", desc: "Suave, delicado y con el sabor tropical del coco 🥥", img: "/flan-coco.jpg" },
    { name: "Pie de Manzana", desc: "Dulce y casero, con trozos de manzana fresca 🍎", img: "/pie-manzana.jpg" },
    { name: "Pie de Maracuyá", desc: "El sabor tropical más refrescante y cremoso 🥭", img: "/pie-maracuya.jpg" },
    { name: "Pie de Limón", desc: "Refrescante y cremoso, el clásico favorito 💛", img: "/pie-limon.jpg" },
    { name: "Pie de Fresa", desc: "Frutal, fresco y lleno de dulzura 🍓", img: "/pie-fresa.jpg" },
    { name: "Carlota", desc: "Un postre suave y ligero, con capas de galleta y crema ✨", img: "/carlota.jpg" },
    { name: "Torta Chilena", desc: "Capas de masa y dulce de leche, una delicia tradicional 🇨🇱", img: "/torta-chilena.jpg" },
    { name: "Tiramisú", desc: "El clásico italiano con café y mascarpone ☕", img: "/tiramisu.jpg" },
  ];

  // 📌 Testimonios
  const testimonios = [
    { texto: "El pie de maracuyá es simplemente espectacular, se siente fresco y lleno de sabor.", autor: "– Sofía R." },
    { texto: "Pedimos la torta chilena para un cumpleaños y fue un éxito total. ¡Todos quedaron encantados!", autor: "– Daniel M." },
    { texto: "Me encantó la presentación y el sabor del tiramisú. 100% recomendado.", autor: "– Mariana G." },
  ];

  // 📌 Precios
  const precios: Record<"Porción" | "Completo", number> = {
    Porción: 1500,
    Completo: 7000,
  };

  // 📌 Estados
  const [open, setOpen] = useState(false);
  const [productoActivo, setProductoActivo] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [opcion, setOpcion] = useState<"Porción" | "Completo">("Porción");

  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [openCarrito, setOpenCarrito] = useState(false);

  const [nombreCliente, setNombreCliente] = useState("");
  const [direccionEntrega, setDireccionEntrega] = useState("");

  const [indexTestimonio, setIndexTestimonio] = useState(0);

  // 📌 Rotación automática de testimonios
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexTestimonio((prev) => (prev + 1) % testimonios.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonios.length]);

  const siguienteTestimonio = () =>
    setIndexTestimonio((prev) => (prev + 1) % testimonios.length);
  const anteriorTestimonio = () =>
    setIndexTestimonio((prev) => (prev - 1 + testimonios.length) % testimonios.length);

  const formatPrice = (price: number) =>
    "₡ " + price.toLocaleString("es-CR");

  const agregarAlCarrito = () => {
    if (!productoActivo) return;
    const item: ItemCarrito = {
      id: Date.now(),
      name: productoActivo.name,
      opcion,
      cantidad,
      precioUnitario: precios[opcion],
      total: precios[opcion] * cantidad,
    };
    setCarrito([...carrito, item]);
    setOpen(false);
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    setCarrito(carrito.map(item =>
      item.id === id
        ? { ...item, cantidad: nuevaCantidad, total: nuevaCantidad * item.precioUnitario }
        : item
    ));
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.total, 0);
  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const generarMensajeWhatsApp = () => {
    let mensaje = `Hola, mi nombre es ${nombreCliente || "________"}.\n`;
    mensaje += `Quiero hacer un pedido para entregar en ${direccionEntrega || "________"}.\n\n`;

    carrito.forEach((item) => {
      mensaje += `- ${item.cantidad} ${item.opcion} de ${item.name} (${formatPrice(item.total)})\n`;
    });

    mensaje += `\nTotal: ${formatPrice(totalCarrito)}\nEntrega sábado 🙌`;
    return encodeURIComponent(mensaje);
  };

  return (
    <>
      {/* 🟢 NAVBAR */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-pink-600">Dalu & Co.</h1>
          <ul className="flex space-x-8 text-gray-700 font-medium">
            <li><a href="#inicio" className="flex items-center gap-2 hover:text-pink-600"><FaHome /> Inicio</a></li>
            <li><a href="#menu" className="flex items-center gap-2 hover:text-pink-600"><FaStore /> Tienda</a></li>
            <li><a href="#horarios" className="flex items-center gap-2 hover:text-pink-600"><FaUsers /> ¿Quiénes somos?</a></li>
            <li><a href="#testimonios" className="flex items-center gap-2 hover:text-pink-600"><FaBlog /> Blog</a></li>
            <li><a href="#footer" className="flex items-center gap-2 hover:text-pink-600"><FaPhone /> Contacto</a></li>
          </ul>
        </div>
      </nav>
      <div className="h-20"></div>

      {/* 🟢 HERO */}
      <main id="inicio" className="bg-gray-50 text-gray-900">
        <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-green-400 via-teal-400 to-pink-400">
          <div className="absolute inset-0">
            <img src="/torta-chilena.jpg" alt="Postres caseros Dalu & Co." className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">Postres que cuentan historias 💕</h1>
            <p className="mt-6 text-lg md:text-2xl font-medium max-w-2xl mx-auto">
              Dalu & Co. – Endulzamos tus momentos especiales con postres artesanales hechos con amor en Guanacaste 🍰
            </p>
            <a href="#menu" className="mt-8 inline-block bg-white text-pink-600 font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition">
              Ver Menú 🍮
            </a>
          </div>
        </section>

        {/* 🟢 MENÚ DE POSTRES */}
        <section id="menu" className="bg-gray-50 py-16 px-6">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">Nuestros Postres</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {listaPostres.map((p, i) => (
              <div key={i} onClick={() => { setProductoActivo(p); setCantidad(1); setOpcion("Porción"); setOpen(true); }}
                className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-green-600">{p.name}</h3>
                  <p className="text-gray-600 mt-2">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🟢 HORARIOS */}
        <section id="horarios" className="bg-pink-50 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Horarios</h2>
          <p className="text-lg text-gray-600">📦 Pedidos: <span className="font-semibold">Lunes a Jueves</span></p>
          <p className="text-lg text-gray-600">🚚 Entregas: <span className="font-semibold">Sábados</span></p>
        </section>
{/* QUIÉNES SOMOS */}
<section
  id="quienes-somos"
  className="bg-pink-50 py-20 px-6"
>
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    
    {/* Imagen */}
    <div className="flex justify-center">
      <img
        src="/familia.jpg"
        alt="Familia Dalu & Co."
        className="rounded-3xl shadow-lg w-full max-w-md object-cover"
      />
    </div>

    {/* Texto */}
    <div className="text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-extrabold text-pink-600 mb-6">
        Quiénes Somos
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        En <span className="font-bold text-pink-600">Dalu & Co.</span> somos un emprendimiento
        familiar nacido en <span className="font-semibold">Guanacaste</span>, con el sueño
        de endulzar los momentos más especiales de tu vida.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        Elaboramos postres <span className="font-semibold">artesanales</span>, con ingredientes
        frescos y mucho cariño, manteniendo el sabor casero que nos recuerda a las recetas
        de mamá y abuelita.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed">
        Nuestro propósito es sencillo:{" "}
        <span className="font-bold text-pink-600">
          llevar dulzura y felicidad
        </span>{" "}
        a tu mesa, porque creemos que cada postre cuenta una historia de amor. 💕
      </p>
    </div>
  </div>
</section>



        {/* 🟢 TESTIMONIOS */}
        <section id="testimonios" className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center relative">
            <h2 className="text-3xl font-bold mb-10 text-pink-600">Lo que dicen nuestros clientes</h2>
            <button onClick={anteriorTestimonio} className="absolute left-0 top-1/2 -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow hover:bg-pink-600 transition"><FaChevronLeft /></button>
            <button onClick={siguienteTestimonio} className="absolute right-0 top-1/2 -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow hover:bg-pink-600 transition"><FaChevronRight /></button>
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={indexTestimonio} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.9 }}
                  className="bg-pink-100 rounded-2xl p-8 shadow-md">
                  <p className="text-gray-700 italic text-lg">“{testimonios[indexTestimonio].texto}”</p>
                  <h4 className="mt-4 font-semibold text-pink-600">{testimonios[indexTestimonio].autor}</h4>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* BLOG */}
<section id="blog" className="bg-gray-50 py-16 px-6">
  <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
    Blog
  </h2>
  <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
    
    {/* Post 1 */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img src="/pie-limon.jpg" alt="Receta de la semana" className="w-full h-48 object-cover"/>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">Receta de la semana</h3>
        <p className="text-gray-600 mt-2">
          Aprende a preparar nuestro famoso pie de limón, paso a paso y con los mejores consejos.
        </p>
        <a href="#" className="inline-block mt-4 text-pink-600 font-semibold hover:underline">
          Leer más →
        </a>
      </div>
    </div>

    {/* Post 2 */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img src="/flan-coco.jpg" alt="Tips de repostería" className="w-full h-48 object-cover"/>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">Tips de repostería</h3>
        <p className="text-gray-600 mt-2">
          Secretos de cocina para que tus postres queden siempre esponjosos, cremosos y llenos de sabor.
        </p>
        <a href="#" className="inline-block mt-4 text-pink-600 font-semibold hover:underline">
          Leer más →
        </a>
      </div>
    </div>

    {/* Post 3 */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img src="/torta-chilena.jpg" alt="Historias dulces" className="w-full h-48 object-cover"/>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">Historias dulces</h3>
        <p className="text-gray-600 mt-2">
          Descubre el origen de nuestras recetas y cómo cada postre guarda un pedacito de historia familiar.
        </p>
        <a href="#" className="inline-block mt-4 text-pink-600 font-semibold hover:underline">
          Leer más →
        </a>
      </div>
    </div>

  </div>
</section>


        {/* 🟢 MODAL PRODUCTO */}
        <AnimatePresence>
          {open && productoActivo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
                <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">✖</button>
                <img src={productoActivo.img} alt={productoActivo.name} className="w-full h-56 object-cover rounded-xl" />
                <h2 className="text-2xl font-bold mt-4 text-gray-800">{productoActivo.name}</h2>
                <p className="text-gray-600 mt-2">{productoActivo.desc}</p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {["Porción", "Completo"].map((opt) => (
                    <button key={opt} onClick={() => setOpcion(opt as "Porción" | "Completo")}
                      className={`p-4 rounded-xl border-2 font-semibold transition ${opcion === opt ? "border-pink-500 bg-pink-50 text-pink-600" : "border-gray-300 bg-gray-100 text-gray-700 hover:border-pink-400"}`}>
                      {opt}<br />
                      <span className="text-lg font-bold">{formatPrice(precios[opt as "Porción" | "Completo"])}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-6 mt-6 justify-center">
                  <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="px-4 py-2 bg-gray-200 rounded-lg text-lg font-bold hover:bg-gray-300">➖</button>
                  <span className="text-xl font-semibold">{cantidad}</span>
                  <button onClick={() => setCantidad(cantidad + 1)} className="px-4 py-2 bg-gray-200 rounded-lg text-lg font-bold hover:bg-gray-300">➕</button>
                </div>
                <p className="text-pink-600 font-extrabold mt-6 text-2xl text-center">Total: {formatPrice(precios[opcion] * cantidad)}</p>
                <button onClick={agregarAlCarrito} className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition">Agregar al Carrito 🛒</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🟢 MODAL CARRITO */}
        <AnimatePresence>
          {openCarrito && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
                <button onClick={() => setOpenCarrito(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">✖</button>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800"><FaShoppingCart className="text-pink-500" /> Carrito de pedidos</h2>
                {carrito.length === 0 ? (
                  <p className="text-gray-600">Tu carrito está vacío.</p>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b text-gray-600">
                            <th className="text-left py-2">Producto</th>
                            <th className="text-center py-2">Cant.</th>
                            <th className="text-right py-2">Subtotal</th>
                            <th className="py-2"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {carrito.map((item) => (
                            <tr key={item.id} className="border-b">
                              <td className="py-2">{item.opcion} de {item.name}</td>
                              <td className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <button onClick={() => actualizarCantidad(item.id, Math.max(1, item.cantidad - 1))} className="px-2 bg-gray-200 rounded hover:bg-gray-300">➖</button>
                                  <span>{item.cantidad}</span>
                                  <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)} className="px-2 bg-gray-200 rounded hover:bg-gray-300">➕</button>
                                </div>
                              </td>
                              <td className="text-right font-semibold">{formatPrice(item.total)}</td>
                              <td className="text-center"><button onClick={() => eliminarDelCarrito(item.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6 space-y-4">
                      <input type="text" placeholder="Tu nombre" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-pink-400" />
                      <input type="text" placeholder="Dirección de entrega" value={direccionEntrega} onChange={(e) => setDireccionEntrega(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-pink-400" />
                    </div>
                    <div className="mt-6 text-xl font-bold text-pink-600 text-right">Total: {formatPrice(totalCarrito)}</div>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${generarMensajeWhatsApp()}`} target="_blank"
                      className="mt-6 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition w-full text-lg shadow-md">
                      <FaWhatsapp size={22} /> Confirmar pedido por WhatsApp
                    </a>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🟢 BOTÓN CARRITO */}
        <button onClick={() => setOpenCarrito(true)} className="fixed top-6 right-6 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-50">
          <FaShoppingCart size={24} />
          {carrito.length > 0 && (<span className="ml-2 bg-white text-pink-600 px-3 py-1 rounded-full text-sm font-bold">{cantidadCarrito} ítems – {formatPrice(totalCarrito)}</span>)}
        </button>

        {/* 🟢 BOTÓN WHATSAPP */}
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50">
          <FaWhatsapp size={28} />
        </a>
      </main>

      {/* 🟢 FOOTER */}
      <footer id="footer" className="bg-black text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-6 text-center md:text-left">
          <div>
            <h4 className="text-lg font-semibold text-pink-400 mb-4">Contacto Dalu & Co.</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>📧 info@daluco.com</li>
              <li>📞 +506 8342 1619</li>
              <li>📍 Liberia, Guanacaste</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-pink-400 mb-4">Tienda Online</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#menu" className="hover:text-green-400">Nuestros Postres</a></li>
              <li><a href="#horarios" className="hover:text-green-400">Horarios</a></li>
              <li><a href="#testimonios" className="hover:text-green-400">Testimonios</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-pink-400 mb-4">Enlaces de Interés</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-green-400">Política de privacidad</a></li>
              <li><a href="#" className="hover:text-green-400">Envíos y devoluciones</a></li>
              <li><a href="#" className="hover:text-green-400">Preguntas frecuentes</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-4">
          © {new Date().getFullYear()} Dalu & Co. – Postres con Amor 💕
        </div>
      </footer>
    </>
  );
}
