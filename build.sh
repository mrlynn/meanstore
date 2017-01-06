#!/bin/sh
rm -rf .env.hackathon
cp .env.hackathon.example .env.hackathon
git add --all
git commit
git push origin sepia
