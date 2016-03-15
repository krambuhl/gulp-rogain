import through from 'through2';
import resolveTree from 'rogain-resolve-tree';

export default function(data, config) {
  return through.obj(function(file, enc, next) {
    var tree = JSON.parse(file.contents);

    if (typeof data === 'function') {
      data(file, (err, data) => output(err, data));
    } else {
      output(null, data);
    }

    function output(err, dat) {
      var out = resolveTree(tree, dat, config);
      file.contents = new Buffer(out || '');
      next(err, file);
    }
  });
}