Switched from node:test -> jest to test out wallaby.

Ended up with two problems

1) Jest in my environment doesn't propery read the same test_helper file in two different test_files.
2) Wallaby leaves hundreds of open DB connections in my environment

