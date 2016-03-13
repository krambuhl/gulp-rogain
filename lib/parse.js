import through from 'through2';
import Parser from 'rogain-parser';
export default function parse(options) {
  var parser = new Parser(options);
  
  return through.obj((file, enc, next) => {
    file.path = file.path.replace('.rogain', '.json');

    parser.parse(file.contents.toString(), tree => {
      file.contents = new Buffer(JSON.stringify(tree)); 
      next(null, file);
    })
  });
}