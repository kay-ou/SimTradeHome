# 🏠 SimTradeHome

**SimTradeHome** is the central hub of the SimTrade ecosystem—a modular suite of open-source tools for financial simulation, strategy development, and machine learning.

## 📦 Ecosystem Overview

The SimTrade ecosystem is designed for modularity, clarity, and cross-project interoperability. Each module can operate independently or be combined for full-stack financial simulation workflows.

## 🔗 How They Work Together

The SimTrade ecosystem is designed for modularity and seamless interoperability. Each module serves a distinct role while supporting cross-project workflows:

- [SimTradeLab](https://github.com/ykayz/SimTradeLab): lightweight, event-driven strategy backtesting framework, runs strategy simulations using both raw data and model outputs, enabling dynamic decision-making and performance evaluation.
- [SimTradeML](https://github.com/ykayz/SimTradeML): machine learning engine for financial prediction and strategy integration, it consumes data from SimTradeData to train predictive models, which can be deployed as APIs or files.
- [SimTradeData](https://github.com/ykayz/SimTradeData): provides clean, structured financial data used by both SimTradeLab and SimTradeML.

Strategies written in SimTradeLab can optionally call SimTradeML models for signal generation, and log results back into SimTradeData-compatible formats.

Together, these modules form a full-stack simulation pipeline—from data ingestion to model training to strategy execution.

## 🔗 Module Highlights

| Module        | Role                                      | Language | Status     |
|---------------|-------------------------------------------|----------|------------|
| SimTradeData  | Data infrastructure for simulation         | Python   | Active     |
| SimTradeLab   | Strategy backtesting engine                | Python   | Active     |
| SimTradeML    | ML model training and deployment           | Python   | Active     |

All modules are designed with modular architecture, clear separation of concerns, and compatibility with cloud-native workflows.

## ✨ About SimTrade

SimTrade is a community-driven initiative to build modular, open-source tools for financial research and automation. It emphasizes clarity, extensibility, and real-world applicability across data, strategy, and machine learning domains.

