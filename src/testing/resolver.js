/* eslint-disable no-undef */


exports.resolveSnapshotPath = (test_path, snapshot_ext)=> (
  test_path + snapshot_ext
);

exports.resolveTestPath = (snaphot_path, snapshot_ext)=> (
  snaphot_path.slice(0, -snapshot_ext.length)
);

exports.testPathForConsistencyCheck = 'some/tests/example.test.js';
