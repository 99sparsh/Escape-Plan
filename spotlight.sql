-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 09, 2019 at 12:17 PM
-- Server version: 5.7.26-0ubuntu0.16.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spotlight`
--
CREATE DATABASE IF NOT EXISTS `spotlight` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `spotlight`;

-- --------------------------------------------------------

--
-- Table structure for table `hints`
--

CREATE TABLE `hints` (
  `id` int(11) NOT NULL,
  `body` varchar(1000) NOT NULL,
  `qid` int(11) NOT NULL,
  `visibility` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hints`
--

INSERT INTO `hints` (`id`, `body`, `qid`, `visibility`, `created_at`, `updated_at`) VALUES
(1, 'addition', 1, 1, '2019-05-31 15:40:42', '2019-05-31 15:40:42'),
(2, 'please add', 1, 1, '2019-05-31 15:40:42', '2019-05-31 15:40:42'),
(3, 'add', 1, 1, '2019-05-31 16:12:28', '2019-05-31 16:12:28');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `qno` int(11) NOT NULL,
  `body` varchar(500) NOT NULL,
  `answer` varchar(500) NOT NULL,
  `points` int(11) NOT NULL,
  `visibility` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`qno`, `body`, `answer`, `points`, `visibility`, `created_at`) VALUES
(1, 'What is 3+3 ?', '$2a$10$iZUR1dYqbDVJgjSOV/mdyORtc/9sYj1YNGzj98paKmgpxnM/cpVIG', 10, 1, '2019-05-23 13:13:51'),
(2, 'What is 3+3 ?', '$2a$10$VT3BIUdxPxoC6RYdcrxjyu1/gyOrvpVFNgkTZVlaL/XUNEneiKP0S', 10, 1, '2019-05-23 13:13:51'),
(3, 'What is 3-3 ?', '$2a$10$YrEXePYSxhHvFI52xerq9O5rliEvVZiC2QAglUX7Bh4le0aPFaosu', 10, 0, '2019-06-25 16:48:42');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` int(11) NOT NULL,
  `verdict` enum('correct','wrong') NOT NULL,
  `uid` int(11) NOT NULL,
  `qno` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `verdict`, `uid`, `qno`, `created_at`) VALUES
(10, 'correct', 8, 3, '2019-06-25 17:10:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `score` int(11) DEFAULT '0',
  `token` varchar(32) DEFAULT NULL,
  `access` int(11) NOT NULL DEFAULT '10',
  `current` int(11) NOT NULL DEFAULT '1',
  `regno` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` varchar(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `score`, `token`, `access`, `current`, `regno`, `created_at`, `phone`, `updated_at`) VALUES
(8, 'Sparsh', '99sparsh', '99.sparsh@gmail.com', '$2a$10$mzMzQIt5mzcjtRfLnBCj/eZyRlCrHcYtNRwDEnybyQPiXi1Uise5i', 30, 'hvqx5Qpy25lbwBsMOC1PpI8vh4MdpruK', 20, 1, '12', '2019-05-14 10:58:31', '8654356', '2019-06-25 17:10:06'),
(9, 'suyash', 'suyash', 'suyash@gmail.com', '$2a$10$xdqMTddMXAXhpJyTLEPzVu.68EQB0lomS/9TBESraX2W4/DyHplca', 0, 'w65RuN30vbKqkul5OJHV71FPQEvaLwJO', 10, 1, '17097790', '2019-05-22 12:07:30', '910000000', '2019-06-25 16:18:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hints`
--
ALTER TABLE `hints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `qid` (`qid`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`qno`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkIdx_26` (`uid`),
  ADD KEY `fkIdx_29` (`qno`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hints`
--
ALTER TABLE `hints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `hints`
--
ALTER TABLE `hints`
  ADD CONSTRAINT `hints_ibfk_1` FOREIGN KEY (`qid`) REFERENCES `questions` (`qno`);

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`qno`) REFERENCES `questions` (`qno`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
