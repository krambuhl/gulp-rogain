import through from 'through2';
export default function register(registry, nameFn) {
  return through.obj(function(file, enc, done) {
    let path = file.path.substr(file.base.length);
    let name;

    if (typeof nameFn === 'function') {
      name = nameFn(path);
    } else {
      let bits = path.split('/');
      name = bits[bits.length - 1].split('.json')[0];
    }
    
    registry.register(name, JSON.parse(file.contents.toString()));
    
    done(null, file);
  });
}