#!/usr/bin/env bash
http-server build/ -p 35729

open -a /Applications/Firefox.app http://localhost:35729