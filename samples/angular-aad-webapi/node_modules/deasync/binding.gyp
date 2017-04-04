{
  "targets": [{
    "target_name": "deasync",
    "sources": [
      "src/deasync.cc"
    ],
    "include_dirs": [
      "<!(node -e \"require('nan')\")"
    ]
  }]
}
