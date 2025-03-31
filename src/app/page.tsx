export default function HomePage() {
	return (
	  <main className="min-h-screen bg-gray-50 p-8">
		<h1 className="text-4xl font-bold text-primary mb-6">
		  Bienvenido a Tailwind v4
		</h1>
		
		<div className="max-w-2xl mx-auto space-y-4">
		  <p className="text-lg text-gray-800">
			Esta página usa las nuevas características de Tailwind CSS v4
		  </p>
		  
		  <button className="btn">
			Botón con estilos personalizados
		  </button>
		  
		  <div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-semibold text-secondary mb-3">
			  Nueva Sintaxis
			</h2>
			<ul className="list-disc pl-5 space-y-2">
			  <li>Variables CSS nativas con @theme</li>
			  <li>Mejor soporte para colores con alpha</li>
			  <li>Nuevas directivas @import</li>
			</ul>
		  </div>
		</div>
	  </main>
	);
  }