import { REGIONES, comunasDeRegion } from '../data/regiones.js';
import CampoFormulario from './CampoFormulario.jsx';

// Selects dependientes: al cambiar la región se reinicia la comuna
function SelectorRegionComuna({ region, comuna, onChange, errores = {} }) {
    const comunas = comunasDeRegion(region);

    return (
        <div className="row">
            <CampoFormulario
                como="select" id="region" name="region" label="Región" className="col-12 col-md-6"
                value={region} error={errores.region}
                onChange={(e) => onChange({ region: e.target.value, comuna: '' })}
            >
                <option value="">-- Seleccione la región --</option>
                {REGIONES.map((r) => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
            </CampoFormulario>
            <CampoFormulario
                como="select" id="comuna" name="comuna" label="Comuna" className="col-12 col-md-6"
                value={comuna} error={errores.comuna} disabled={!region}
                onChange={(e) => onChange({ region, comuna: e.target.value })}
            >
                <option value="">-- Seleccione la comuna --</option>
                {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
            </CampoFormulario>
        </div>
    );
}

export default SelectorRegionComuna;
