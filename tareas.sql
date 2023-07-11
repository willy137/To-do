-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2022 a las 23:27:06
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tareas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items`
--

CREATE TABLE `items` (
  `id_items` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_resolucion` date DEFAULT NULL,
  `descripcion` varchar(300) NOT NULL,
  `prioridad` varchar(50) NOT NULL,
  `fecha_limite` date NOT NULL,
  `estado` varchar(100) NOT NULL,
  `id_lista` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `items`
--

INSERT INTO `items` (`id_items`, `titulo`, `fecha_creacion`, `fecha_resolucion`, `descripcion`, `prioridad`, `fecha_limite`, `estado`, `id_lista`) VALUES
(2, 'Trabajo practico matematica N 2', '2022-10-13', '2022-10-28', 'Hacerlo teniendo en cuenta las propiedades  ', 'Baja', '2022-10-20', 'Resuelto', 1),
(3, 'Tp Ingenieria 11', '2022-10-20', '2022-10-22', 'Realizar el camino basico  ', 'Media', '2022-10-24', 'Resuelto', 1),
(4, 'Parte http1', '2022-10-22', '2022-10-31', 'servidor http  ', 'Alta', '2022-10-26', 'Resuelto', 3),
(5, 'Practico de Sql 1', '2022-10-07', '2022-10-31', 'Hacer las consultas', 'Alta', '2022-10-31', 'Resuelto', 1),
(94, 'Universidad 1', '2022-11-09', '2022-11-09', 'hola ', 'Baja', '2022-11-24', 'Resuelto', 61),
(95, 'Universidad 1', '2022-11-09', '2022-11-10', 'probando todo ', 'Baja', '2022-11-23', 'Resuelto', 63),
(96, 'Leche', '2022-11-09', '2022-11-09', 'Comprar 2 litros de leche ', 'Baja', '2022-11-17', 'Resuelto', 64),
(97, 'Atun', '2022-11-09', '2022-11-09', 'Comprar 10 latas de atun para 5 dias de comida ', 'Alta', '2022-11-20', 'Resuelto', 64),
(98, 'Comprar papas y queso', '2022-11-10', NULL, '5 kilos de papa y  2 kilos de queso, bebidas tambien ', 'Media', '2022-11-25', 'Sin resolver', 65),
(109, 'Comprar harina', '2022-11-10', NULL, 'harina 4 ceros para mejor calidad en alfajores', 'Baja', '2022-11-24', 'Sin resolver', 53),
(110, 'maicena', '2022-11-10', NULL, 'Comprar bastantes', 'Baja', '2022-11-24', 'Sin resolver', 53),
(111, 'margarina', '2022-11-10', NULL, '500 gramos', 'Baja', '2022-11-24', 'Sin resolver', 53),
(114, '7 almas 23', '2022-11-11', '2022-11-11', 'La de will smith  ', 'Media', '2022-11-25', 'Resuelto', 69),
(115, 'arreglando todo', '2022-11-11', NULL, 'usuario arreglado', 'Baja', '2022-11-26', 'Sin resolver', 53),
(121, 'Universidad 1', '2022-11-11', NULL, '3', 'Baja', '2022-11-10', 'Sin resolver', 1),
(122, 'Universidad 1', '2022-11-11', NULL, 'd ', 'Alta', '2022-11-10', 'Sin resolver', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_tareas`
--

CREATE TABLE `lista_tareas` (
  `id_lista` int(100) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_resolucion` date DEFAULT NULL,
  `estado` varchar(50) NOT NULL,
  `activa` tinyint(1) NOT NULL DEFAULT 1,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lista_tareas`
--

INSERT INTO `lista_tareas` (`id_lista`, `titulo`, `fecha_creacion`, `fecha_resolucion`, `estado`, `activa`, `id_usuario`) VALUES
(1, 'Universidad 11', '2022-10-01', NULL, 'Sin resolver', 1, 3),
(3, 'Final_web2', '2022-10-21', '2022-10-31', 'Resuelto', 0, 3),
(53, 'Alfajores', '2022-11-08', NULL, 'Sin resolver', 1, 5),
(61, 'Yerba', '2022-11-09', '2022-11-09', 'Resuelto', 0, 3),
(63, 'Yerba', '2022-11-09', '2022-11-10', 'Resuelto', 1, 5),
(64, 'Compras', '2022-11-09', '2022-11-09', 'Resuelto', 0, 5),
(65, 'Papas con queso Chedar', '2022-11-10', NULL, 'Sin resolver', 1, 3),
(69, 'Pelicuas por ver', '2022-11-11', '2022-11-11', 'Resuelto', 0, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nom_usuario` varchar(100) NOT NULL,
  `nombre_completo` varchar(200) NOT NULL,
  `password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nom_usuario`, `nombre_completo`, `password`) VALUES
(3, 'user1', 'Usuario Completo', '$2b$10$w9XvflKhPJV0B.7mtM.GNOoTP6KmtUtAQJ8yGigmir5kudttLQlCW'),
(5, 'Profe12', 'PROFESOR LAB2', '$2b$10$Cm7ZXeByXgq5TJ20x4wutu8wYGXuoIIb6rw2Ivb9Uoa3lMAwV5aoS');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id_items`),
  ADD KEY `lista` (`id_lista`);

--
-- Indices de la tabla `lista_tareas`
--
ALTER TABLE `lista_tareas`
  ADD PRIMARY KEY (`id_lista`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom_usuario` (`nom_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `items`
--
ALTER TABLE `items`
  MODIFY `id_items` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT de la tabla `lista_tareas`
--
ALTER TABLE `lista_tareas`
  MODIFY `id_lista` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`id_lista`) REFERENCES `lista_tareas` (`id_lista`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
