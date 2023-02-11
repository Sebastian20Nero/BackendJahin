const crypto = require('crypto');

const TABLA = 'property';

module.exports = function (injectedStore) {
    
    let store = injectedStore;

    async function list(condicional) { 
        var cond=""; 
        if(condicional.id_property !== undefined){ cond=` and id_property=${condicional.id_property}`}
        return store.list(TABLA, cond);
    }

    async function upsert(req) { 
        const id='id_property'; 
        var imagencarga=""; 
        const { id_property, property, descripcion, area_p, n_cuartos, n_banos, n_parqueaderos, valor, image, estado} = req.body;
            if(req.file){ 
                const { path } = req.file;  imagencarga = path;
            }else{ 
                imagencarga = image 
            }
        let obj_info = (id_property ==  null) ? { strh: '', strv: ``} : { strh: 'id_property,', strv: `'${id_property}',`};
        
        const query=`insert into ${TABLA}
                     ( ${obj_info.strh} property, descripcion, area_p, n_cuartos, n_banos, n_parqueaderos, valor, imagen, estado) 
                    values(${obj_info.strv}'${property}','${descripcion}','${area_p}','${n_cuartos}','${n_banos}','${n_parqueaderos}','${valor}','${imagencarga}','${estado}')
                        ON CONFLICT (${id}) DO UPDATE SET 
                        property=EXCLUDED.property, 
                        descripcion=EXCLUDED.descripcion, 
                        area_p=EXCLUDED.area_p, 
                        n_cuartos=EXCLUDED.n_cuartos, 
                        n_banos=EXCLUDED.n_banos, 
                        n_parqueaderos=EXCLUDED.n_parqueaderos, 
                        valor=EXCLUDED.valor, 
                        imagen=EXCLUDED.imagen, 
                        estado=EXCLUDED.estado;`;
        return store.upsert(query);
    }

    async function remove(id) {
        item="id_property"
        return store.remove(TABLA,item, id);
    }

    return {
        list,
        upsert,
        remove
    };
}