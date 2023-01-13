-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas generowania: 13 Sty 2023, 18:38
-- Wersja serwera: 5.5.62-0+deb8u1
-- Wersja PHP: 5.6.40-0+deb8u12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza danych: `ai2_projekt`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Department`
--

DROP TABLE IF EXISTS `Department`;
CREATE TABLE IF NOT EXISTS `Department` (
`id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `shortname` varchar(100) NOT NULL,
  `description` text,
  `shortdescription` varchar(500) DEFAULT NULL,
  `adress` varchar(120) DEFAULT NULL,
  `affiliation` varchar(200) DEFAULT NULL,
  `owner_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `Department`
--

INSERT INTO `Department` (`id`, `name`, `shortname`, `description`, `shortdescription`, `adress`, `affiliation`, `owner_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Wydział Programistyczny', 'WP', 'Wydział do spraw programowania zaawansowanych aplikacji internetowych.\r\nKompleks budynków B1,B2.', 'Kompleks budynków B1 i B2 na ulicy Mazowieckiej.', 'Mazowiecka 8', 'Przynależność do WP.', 2, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(2, 'Wydział sieci.', 'WS', 'Wydział zajmujący się sieciami znajdujący się przy kompleksie budynków A1 i A2 na ulicy krakowskiej.', 'Kompleks budynków A1 i A2', 'Krakowska 6', 'Przynależność do WS', 4, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(3, 'Wydział do spraw baz danych.', 'WB', 'Wydział do spraw zarządzania bazami danych znajdujący się w budynkach C1 i C2 znajdujące się na ulicy Jagielońskiej.', 'Wydział C1 i C2', 'Jagielońska 15.', 'Przynależność do WB.', 6, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(4, 'Wydział do tworzenia stron internetowych.', 'WI', 'Wydział do spraw webowych znajdujący się na ulicy Polańskiej w budynkach D1 i D2.', 'Wydział webowy w kompleksie D1 i D2.', 'Polańska 2', 'Przynależność do WI.', 8, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(5, 'Budynek A1 Uniwersytetu Rzeszowskiego', 'A1', 'Budynek A1 uniwersytetu Rzeszowskiego z salami 350,351,352', 'URZ A1', 'Rzeszów ul. Rejtana', 'Przynależność URZ', 8, '2023-01-11 00:00:00', '2023-01-11 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Item`
--

DROP TABLE IF EXISTS `Item`;
CREATE TABLE IF NOT EXISTS `Item` (
`id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text,
  `inventory_tag` varchar(200) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `Item`
--

INSERT INTO `Item` (`id`, `name`, `description`, `inventory_tag`, `category_id`, `room_id`, `department_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Komputer', 'Komputer serwerowy', 'Kom', 8, 4, 3, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(2, 'Laptop Porgramistyczny', 'Laptop do programowania', 'Laptop', 1, 1, 1, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(3, 'Laptop do stron webowych.', 'Laptop z wszystkimi programami do pisania stron webowych.', 'Laptop', 10, 5, 4, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(4, 'Kabel RJ-45', 'Kabel Rj-45', 'KBL', 3, 5, 2, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(5, 'Komputer1', 'Pierwszy komputer studencki', 'Kom1', 12, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(6, 'Komputer2', 'Drugi komputer studencki', 'Kom1', 12, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(7, 'Komputer3', 'Trzeci komputer studencki', 'Kom1', 12, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(8, 'Komputer4', 'Czwarty komputer studencki', 'Kom1', 12, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(9, 'Komputer5', 'Piąty komputer studencki', 'Kom1', 12, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(10, 'Komputer6', 'Szósty komputer studencki', 'Kom1', 12, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(11, 'Komputer7', 'Siódmy komputer studencki', 'Kom1', 12, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(12, 'Komputer8', 'Ósmy komputer studencki', 'Kom1', 12, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(13, 'Komputer9', 'Dziewiąty komputer studencki', 'Kom1', 12, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(14, 'Komputer10', 'Dzieisiąty komputer studencki', 'Kom1', 12, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(15, 'Krzeszło1', 'Pierwsze krzesło biurowe dla studenta.', 'Krzesło', 11, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(16, 'Krzeszło2', 'Drugie krzesło biurowe dla studenta.', 'Krzesło', 11, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(17, 'Krzeszło3', 'Trzecie krzesło biurowe dla studenta.', 'Krzesło', 11, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(18, 'Krzeszło4', 'Czwarte krzesło biurowe dla studenta.', 'Krzesło', 11, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(19, 'Krzeszło5', 'Piąte krzesło biurowe dla studenta.', 'Krzesło', 11, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(20, 'Krzeszło6', 'Szóste krzesło biurowe dla studenta.', 'Krzesło', 11, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(21, 'Krzeszło7', 'Siódme krzesło biurowe dla studenta.', 'Krzesło', 11, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(22, 'Krzeszło9', 'Dziewiąte krzesło biurowe dla studenta.', 'Krzesło', 11, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(23, 'Krzeszło10', 'Dzeisiąte krzesło biurowe dla studenta.', 'Krzesło', 11, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(24, 'Mysz1', 'Pierwsza myszka dla studenta przeznaczona do pracy.', 'Mysz', 10, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(25, 'Mysz2', 'Druga myszka dla studenta przeznaczona do pracy.', 'Mysz', 10, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(26, 'Mysz3', 'Trzecia myszka dla studenta przeznaczona do pracy.', 'Mysz', 10, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(27, 'Mysz4', 'Czwarta myszka dla studenta przeznaczona do pracy.', 'Mysz', 10, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(28, 'Mysz5', 'Piąta myszka dla studenta przeznaczona do pracy.', 'Mysz', 10, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(29, 'Mysz6', 'Szósta myszka dla studenta przeznaczona do pracy.', 'Mysz', 10, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(30, 'Mysz7', 'Siódma myszka dla studenta przeznaczona do pracy.', 'Mysz', 10, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(31, 'Mysz8', 'Ósma myszka dla studenta przeznaczona do pracy.', 'Mysz', 10, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(32, 'Mysz9', 'Dziewiąta myszka dla studenta przeznaczona do pracy.', 'Mysz', 10, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(33, 'Mysz10', 'Dziesiąta myszka dla studenta przeznaczona do pracy.', 'Mysz', 10, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(34, 'Projektor', 'Projektor do wyświetlania materiałow.', 'Projektor', 15, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(35, 'Klawiatura1', 'Pierwsza Klawiatura do nauki dla studenta.', 'Klaw', 16, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(36, 'Klawiatura2', 'Druga Klawiatura do nauki dla studenta.', 'Klaw', 16, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(37, 'Klawiatura3', 'Trzecia Klawiatura do nauki dla studenta.', 'Klaw', 16, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(38, 'Klawiatura4', 'Czwarta Klawiatura do nauki dla studenta.', 'Klaw', 16, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(39, 'Klawiatura5', 'Piąta Klawiatura do nauki dla studenta.', 'Klaw', 16, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(40, 'Klawiatura6', 'Szósta Klawiatura do nauki dla studenta.', 'Klaw', 16, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(41, 'Klawiatura7', 'Siódma Klawiatura do nauki dla studenta.', 'Klaw', 16, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(42, 'Klawiatura8', 'Ósma Klawiatura do nauki dla studenta.', 'Klaw', 16, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(43, 'Klawiatura9', 'Dziewiąta Klawiatura do nauki dla studenta.', 'Klaw', 16, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(44, 'Klawiatura10', 'Dziesiąta Klawiatura do nauki dla studenta.', 'Klaw', 16, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(45, 'Laptop', 'Laptop wykładowczy.', 'Lap', 14, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(46, 'Klawiatura1', 'Pierwsza klawiatura do nauki', 'klaw', 16, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(47, 'Klawiatura2', 'Druga klawiatura do nauki', 'klaw', 16, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(48, 'Klawiatura3', 'Trzecia klawiatura do nauki', 'klaw', 16, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(49, 'Klawiatura4', 'Czwarta klawiatura do nauki', 'klaw', 16, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(50, 'Klawiatura5', 'Piąta klawiatura do nauki', 'klaw', 16, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(51, 'Klawiatura6', 'Szósta klawiatura do nauki', 'klaw', 16, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(52, 'Klawiatur7', 'Siódma klawiatura do nauki', 'klaw', 16, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(53, 'Projektor', 'Projektor do wyświetlania treści.', 'Projektor', 15, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(54, 'Laptop', 'Laptop wykładowczy przeznaczony do pracy dla wykładowcy.', 'Lap', 14, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(55, 'Mysz1', 'Pierwsza myszka przeznaczona do nauki dla studenta', 'Mysz', 13, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(56, 'Mysz2', 'Druga myszka przeznaczona do nauki dla studenta', 'Mysz', 13, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(57, 'Mysz3', 'Trzecia myszka przeznaczona do nauki dla studenta', 'Mysz', 13, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(58, 'Mysz4', 'Czwarta myszka przeznaczona do nauki dla studenta', 'Mysz', 13, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(59, 'Mysz5', 'Piąta myszka przeznaczona do nauki dla studenta', 'Mysz', 13, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(60, 'Mysz6', 'Szósta myszka przeznaczona do nauki dla studenta', 'Mysz', 13, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(61, 'Mysz7', 'Siódma myszka przeznaczona do nauki dla studenta', 'Mysz', 13, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(62, 'Komputer1', 'Pierwszy komputer studencki do nauki', 'PC', 12, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(63, 'Komputer2', 'Drugi komputer studencki do nauki', 'PC', 12, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(64, 'Komputer3', 'Trzeci komputer studencki do nauki', 'PC', 12, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(65, 'Komputer4', 'Czwarty komputer studencki do nauki', 'PC', 12, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(66, 'Komputer5', 'Piąty komputer studencki do nauki', 'PC', 12, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(67, 'Komputer6', 'Szósty komputer studencki do nauki', 'PC', 12, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(68, 'Komputer7', 'Siódmy komputer studencki do nauki', 'PC', 12, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(69, 'Krzesło1', 'Pierwsze krzesło biurowe dla studenta.', 'Krzesło', 11, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(70, 'Krzesło2', 'Drugie krzesło biurowe dla studenta.', 'Krzesło', 11, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(71, 'Krzesło2', 'Trzecie krzesło biurowe dla studenta.', 'Krzesło', 11, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(72, 'Krzesło4', 'Czwarte krzesło biurowe dla studenta.', 'Krzesło', 11, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(73, 'Krzesło5', 'Piąte krzesło biurowe dla studenta.', 'Krzesło', 11, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(74, 'Krzesł6', 'Szóste krzesło biurowe dla studenta.', 'Krzesło', 11, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(75, 'Krzesło7', 'Siódme krzesło biurowe dla studenta.', 'Krzesło', 11, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(76, 'MyszW', 'Myszka do laptopa dla wykładowcy', 'Mw', 10, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(77, 'Laptop', 'Laptop programistyczny', 'Lap', 1, 8, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(78, 'Kable Rj', 'Kable rj-45', 'Rj', 3, 8, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(79, 'Mysz1', 'Pierwsza zapasowa myszka', 'Mz', 17, 8, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(80, 'Mysz2', 'Druga zapasowa myszka', 'Mz', 17, 8, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(81, 'Mysz3', 'Trzecia zapasowa myszka', 'Mz', 17, 8, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(82, 'Zapasowa klawiatura1', 'Pierwsza zapasowa klawiatura w razie potrzby', 'KlawZ', 16, 8, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(83, 'Zapasowa klawiatura2', 'Druga zapasowa klawiatura w razie potrzby', 'KlawZ', 16, 8, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(84, 'Zapasowa klawiatura3', 'Trzecia zapasowa klawiatura w razie potrzby', 'KlawZ', 16, 8, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(85, 'Biurko1', 'Pierwsze biurko do pracy dla studenta.', 'Br', 18, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(86, 'Biurko2', 'Drugie biurko do pracy dla studenta.', 'Br', 18, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(87, 'Biurko3', 'Trzecie biurko do pracy dla studenta.', 'Br', 18, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(88, 'Biurko4', 'Czwarte biurko do pracy dla studenta.', 'Br', 18, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(89, 'Biurko5', 'Piąte biurko do pracy dla studenta.', 'Br', 18, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(90, 'Biurk61', 'Szóste biurko do pracy dla studenta.', 'Br', 18, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(91, 'Biurko7', 'Siódme biurko do pracy dla studenta.', 'Br', 18, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(92, 'Biurko8', 'Ósme biurko do pracy dla studenta.', 'Br', 18, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(93, 'Biurko9', 'Dziewiąte biurko do pracy dla studenta.', 'Br', 18, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(94, 'Biurko10', 'Dziesiąte biurko do pracy dla studenta.', 'Br', 18, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(95, 'Biurko1', 'Pierwsze biurko do pracy dla studenta.', 'Br', 18, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(96, 'Biurko2', 'Drugie biurko do pracy dla studenta.', 'Br', 18, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(97, 'Biurko3', 'Trzecie biurko do pracy dla studenta.', 'Br', 18, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(98, 'Biurko4', 'Czwarte biurko do pracy dla studenta.', 'Br', 18, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(99, 'Biurko5', 'Piąte biurko do pracy dla studenta.', 'Br', 18, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(100, 'Biurko6', 'Szóste biurko do pracy dla studenta.', 'Br', 18, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(101, 'Biurko7', 'Siódme biurko do pracy dla studenta.', 'Br', 18, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(102, 'BiurkoW', 'Biurko dla wykładowcy', 'Br', 18, 6, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(103, 'BiurkoW', 'Biurko dla wykładowcy', 'Br', 18, 7, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(104, 'Biurko zapasowe', 'Biurko zapasowe w razie potrzeby gdyby jakieś uległo zniszczeniu.', 'BrZ', 18, 8, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ItemCategory`
--

DROP TABLE IF EXISTS `ItemCategory`;
CREATE TABLE IF NOT EXISTS `ItemCategory` (
`id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `inventory_tag` varchar(200) DEFAULT NULL,
  `department_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `ItemCategory`
--

INSERT INTO `ItemCategory` (`id`, `name`, `description`, `inventory_tag`, `department_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Laptop', 'Laptop do programowania', 'Laptopy', 1, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(2, 'Laptop firmowy', 'Laptop ogólny.', 'Laptopy', 1, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(3, 'Kabel Rj-45', 'Kabel Rj-45', 'kable', 2, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(4, 'kable UTP ', 'skrętka nieekranowana: najtańsza i najpopularniejsza, do użytku przede wszystkim wewnątrz pomieszczeń.', 'Kable', 2, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(5, 'kable FTP', 'skrętka całościowo ekranowana folią: rozwiązanie często stosowane w sieciach, zapewniające większe bezpieczeństwo.', 'Kable', 2, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(6, 'STP – S/FTP', 'skrętka całościowo ekranowana folią, a do tego ekranowane są jeszcze poszczególne pary przewodów: wykorzystywana głównie w przemyśle, chroniąca przed szkodliwym wpływem elektromagnetycznym', 'Kable', 2, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(7, 'Komputery', 'komputery do prowadzenia baz danych', 'PC', 3, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(8, 'Serwery', 'Serwery baz danych.', 'Serwer', 3, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(9, 'Laptopy', 'Laptopy do pisania stron\r\n', 'Laptop', 4, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(10, 'Myszki', 'Myszki do laptopów.', 'Mysz', 4, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(11, 'Krzesło biurowe', 'Krzesło biurowe dla studentów.', 'Krzesło', 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(12, 'Komputer studencki', 'Komputer przeznaczony do pracy dla studenta.', 'PC', 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(13, 'Mysz', 'Mysz do pracy dla studenta.', 'Mysz', 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(14, 'Laptop wykładowczy', 'Laptop dla wykładowcy', 'Laptop', 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(15, 'Projektor', 'Projektor do wyświetlania treści', 'Prk', 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(16, 'Klawiatura', 'Klawiatura do przeznaczona do nauki dla studenta', 'Klaw', 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(17, 'Zapasowe myszki', 'Zapasowe myszki w razie potrzeby gdyby sie zepsuły aktualne.', 'MyszZ', 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(18, 'Biurko', 'Biurko do pracy dla studenta', 'Br', 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Room`
--

DROP TABLE IF EXISTS `Room`;
CREATE TABLE IF NOT EXISTS `Room` (
`id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `longname` varchar(200) DEFAULT NULL,
  `description` text,
  `tag` varchar(80) DEFAULT NULL,
  `department_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `Room`
--

INSERT INTO `Room` (`id`, `name`, `longname`, `description`, `tag`, `department_id`, `createdAt`, `updatedAt`) VALUES
(1, '220', 'Pracownia programistyczna', 'Pracownia dla pracowników aby w spokoju i ciszy programować', 'pracownia', 1, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(2, '340', 'Pracownia sieci', 'Wszystkie kable i inne przedmioty do montażu sieci.', 'Magazyn', 2, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(4, '481', 'Pokój webowy.', 'Pokój dla pracowników piszących strony.', 'WEB', 4, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(5, '321', 'Pokój serwerowy', 'Pokój z serwerami.', 'Server', 3, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(6, '350', 'Pokój 350 laboratyjny', 'Pokój laboratoryjny przeznaczony do prowadzenia zajęć w budynku A1 Uniwersytetu Rzeszowskiego.', 'A350', 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(7, '351', 'Pokój laboratoryjny 351', 'Pokój laboratoryjny przeznaczony do prowadzenia zajęć w budynku Uniwersytetu Rzeszowskiego.', 'A351', 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(8, 'Pokój 352', 'Sala sprzętowa', 'Sala z przedmiotami przeznaczonymi do prowadzenia zajęć dla studentów.', 'A352', 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `User`
--

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
`id` int(11) NOT NULL,
  `login` varchar(60) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(120) NOT NULL,
  `firstname` varchar(60) DEFAULT NULL,
  `surname` varchar(60) DEFAULT NULL,
  `role` int(11) NOT NULL,
  `job_title` varchar(200) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `User`
--

INSERT INTO `User` (`id`, `login`, `password`, `email`, `firstname`, `surname`, `role`, `job_title`, `phone`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'admin@gmail.com', 'Administrator', 'Adminowy', 1, 'Administrator systemu inwetaryzacji', '123456789', '2023-01-12 00:00:00', '2023-01-12 00:00:00'),
(2, 'andrzej102', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'andrzej102@gmail.com', 'Andrzej', 'Zamorski', 1, 'Specjalista do spraw programowania', '125532513', '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(3, 'bogdan101', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'bogdan101@gmail.com', 'Bogdan', 'Bobek', 0, 'Junior do spraw programowania.', '412532532', '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(4, 'wojciech12', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'wojciech12@gmail.com', 'Wojciech', 'Nowak', 1, 'Specjalista do spraw sieci.', '543731761', '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(5, 'tomasz10', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'tomasz10@gmail.com', 'Tomasz', 'Krawczyk', 0, 'Junior do spraw sieci.', '543256326', '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(6, 'robert2002', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'robert2002@gmail.com', 'Robert', 'Baran', 1, 'Specjalista do spraw baz danych.', '532562362', '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(7, 'paweł1999', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'paweł1999@gmail.com', 'Paweł', 'Pawłowski', 0, 'Junior do spraw baz danych.', '575424627', '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(8, 'adminurz', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'adminurz@ur.edu.pl', 'Patryk', 'Pieczarek', 1, 'Administrator Uniwersytetu Rzeszowskiego.', '781234798', '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(9, 'uzytkownikurz', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'uzytkownikurz@ur.edu.pl', 'Grzegorz', 'Krychowiak', 0, 'Użytkownik Uniwersytetu Rzeszowskiego.', '438796879', '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(10, 'robert350', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'rfafczyk@ur.edu.pl', 'Robert', 'Fafczyk', 0, 'Wykładowca.', '523523532', '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(11, 'franciszek351', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'fboberski@ur.edu.pl', 'Franciszek', 'Boberski', 0, 'wykładowca', '462345632', '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(12, 'bogusław352', '$2b$12$G9qlO0zXokjH4LKlsB.sAOiEcXi1Zf8aUpuQpuQ.NIwV4R2QBSK7S', 'brobak@ur.edu.pl', 'Bogusław', 'Robak', 0, 'Opiekun.', '214523463', '2023-01-11 00:00:00', '2023-01-11 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserDepartmentRole`
--

DROP TABLE IF EXISTS `UserDepartmentRole`;
CREATE TABLE IF NOT EXISTS `UserDepartmentRole` (
`id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `UserDepartmentRole`
--

INSERT INTO `UserDepartmentRole` (`id`, `role`, `user_id`, `department_id`, `createdAt`, `updatedAt`) VALUES
(1, 2, 2, 1, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(2, 2, 4, 2, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(3, 2, 6, 3, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(5, 1, 10, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(6, 1, 11, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00'),
(7, 0, 12, 5, '2023-01-11 00:00:00', '2023-01-11 00:00:00');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `Department`
--
ALTER TABLE `Department`
 ADD PRIMARY KEY (`id`), ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `Item`
--
ALTER TABLE `Item`
 ADD PRIMARY KEY (`id`), ADD KEY `category_id` (`category_id`), ADD KEY `room_id` (`room_id`), ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `ItemCategory`
--
ALTER TABLE `ItemCategory`
 ADD PRIMARY KEY (`id`), ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `Room`
--
ALTER TABLE `Room`
 ADD PRIMARY KEY (`id`), ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `UserDepartmentRole`
--
ALTER TABLE `UserDepartmentRole`
 ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`), ADD KEY `department_id` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `Department`
--
ALTER TABLE `Department`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT dla tabeli `Item`
--
ALTER TABLE `Item`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=105;
--
-- AUTO_INCREMENT dla tabeli `ItemCategory`
--
ALTER TABLE `ItemCategory`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT dla tabeli `Room`
--
ALTER TABLE `Room`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT dla tabeli `User`
--
ALTER TABLE `User`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT dla tabeli `UserDepartmentRole`
--
ALTER TABLE `UserDepartmentRole`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `Department`
--
ALTER TABLE `Department`
ADD CONSTRAINT `Department_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `Item`
--
ALTER TABLE `Item`
ADD CONSTRAINT `Item_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `ItemCategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Item_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `Room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Item_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `Department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `ItemCategory`
--
ALTER TABLE `ItemCategory`
ADD CONSTRAINT `ItemCategory_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `Department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `Room`
--
ALTER TABLE `Room`
ADD CONSTRAINT `Room_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `Department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `UserDepartmentRole`
--
ALTER TABLE `UserDepartmentRole`
ADD CONSTRAINT `UserDepartmentRole_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `UserDepartmentRole_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `Department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
