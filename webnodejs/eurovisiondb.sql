-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Dec 12. 20:39
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `eurovisiondb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `eurovision_events`
--

CREATE TABLE `eurovision_events` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `number_of_participants` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `eurovision_events`
--

INSERT INTO `eurovision_events` (`id`, `year`, `date`, `city`, `country`, `number_of_participants`) VALUES
(1, 1991, '1991-05-04', 'Róma', 'Olaszország', 22),
(2, 2000, '2000-05-13', 'Stockholm', 'Svédország', 24),
(3, 1974, '1974-04-06', 'Brighton', 'Egyesült Királyság', 17),
(4, 1972, '1972-03-25', 'Edinburgh', 'Egyesült Királyság', 18),
(5, 1969, '1969-03-29', 'Madrid', 'Spanyolország', 16),
(6, 1960, '1960-03-29', 'London', 'Egyesült Királyság', 13),
(7, 1985, '1985-05-04', 'Göteborg', 'Svédország', 19),
(8, 2004, '2004-05-15', 'Isztambul', 'Törökország', 36);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `eurovision_songs`
--

CREATE TABLE `eurovision_songs` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `order_in_show` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `language` varchar(255) DEFAULT NULL,
  `performer` varchar(255) DEFAULT NULL,
  `original_title` varchar(255) DEFAULT NULL,
  `translated_title` varchar(255) DEFAULT NULL,
  `placement` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `eurovision_songs`
--

INSERT INTO `eurovision_songs` (`id`, `year`, `order_in_show`, `country`, `language`, `performer`, `original_title`, `translated_title`, `placement`, `points`) VALUES
(1, 1985, 14, 'Egyesült Királyság', 'angol', 'Vikki', 'Love Is', 'A szerelem...', 4, 100),
(2, 1988, 8, 'Izrael', 'héber', 'Yardena Arazi', 'Ben Adam', 'Emberi lény', 7, 85),
(3, 1972, 13, 'Jugoszlávia', 'szerbhorvát', 'Tereza Kesovija', 'Muzika i ti', 'A zene és Te', 9, 87),
(4, 1993, 8, 'Málta', 'angol', 'William Mangion', 'This Time', 'Ez alkalommal', 8, 69),
(5, 1989, 2, 'Izrael', 'héber', 'Gili és Galit', 'Derech hamelech', 'A király útja', 12, 50),
(6, 1996, 4, 'Portugália', 'portugál', 'Lúcia Moniz', 'O meu coração não tem cor', 'A szívemnek nincsen színe', 6, 92),
(7, 2004, 16, 'Görögország', 'angol', 'Sakis Rouvas', 'Shake It', 'Rázzad', 3, 252),
(8, 1975, 10, 'Málta', 'angol', 'Renato', 'Singing This Song', 'Énekelni e dalt', 12, 32);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `languages`
--

INSERT INTO `languages` (`id`, `country`, `language`) VALUES
(1, 'Luxemburg', 'luxemburgi'),
(2, 'Jugoszlávia', 'szerbhorvát'),
(3, 'Svájc', 'francia'),
(4, 'Spanyolország', 'spanyol'),
(5, 'Olaszország', 'olasz'),
(6, 'Horvátország', 'horvát'),
(7, 'Ciprus', 'török'),
(8, 'Belgium', 'német'),
(9, 'Izland', 'izlandi'),
(10, 'Málta', 'máltai'),
(11, 'Litvánia', 'litván'),
(12, 'Ukrajna', 'ukrán'),
(13, 'Franciaország', 'francia'),
(14, 'Moldova', 'román'),
(15, 'Lengyelország', 'lengyel'),
(16, 'Fehéroroszország', 'belarusz'),
(17, 'Portugália', 'portugál'),
(18, 'Monaco', 'francia'),
(19, 'Grúzia', 'grúz'),
(20, 'Izrael', 'héber'),
(21, 'Törökország', 'török'),
(22, 'Magyarország', 'magyar'),
(23, 'Görögország', 'görög'),
(24, 'Szlovénia', 'szlovén'),
(25, 'Norvégia', 'norvég'),
(26, 'Románia', 'román'),
(27, 'Ausztria', 'német'),
(28, 'Írország', 'angol'),
(29, 'Hollandia', 'holland'),
(30, 'Svájc', 'német'),
(31, 'Örményország', 'örmény'),
(32, 'Észtország', 'észt'),
(33, 'Szlovákia', 'szlovák'),
(34, 'Szerbia', 'szerb');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `eurovision_events`
--
ALTER TABLE `eurovision_events`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `eurovision_songs`
--
ALTER TABLE `eurovision_songs`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `eurovision_events`
--
ALTER TABLE `eurovision_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `eurovision_songs`
--
ALTER TABLE `eurovision_songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
