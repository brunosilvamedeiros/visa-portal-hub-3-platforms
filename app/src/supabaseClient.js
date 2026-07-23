import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://iuwvwhofxuvmwnpbsnth.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3Z3aG9meHV2bXducGJzbnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MzA3OTMsImV4cCI6MjEwMDQwNjc5M30.0kvXT5Dgr68nyOJGRoSlKx25kUlu4XCK-zB9yXCX9Dk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 1. Fetch All Clientes with Tracks
export async function fetchClientesWithTracks() {
  try {
    const { data: clientesData, error: cErr } = await supabase
      .from('clientes')
      .select('*')
      .order('created_at', { ascending: false });

    if (cErr) throw cErr;

    const { data: tracksData, error: tErr } = await supabase
      .from('tracks')
      .select('*');

    if (tErr) throw tErr;

    const combined = (clientesData || []).map(c => ({
      ...c,
      faseIndex: 1,
      fases: ["Aguardando início", "Verificando requisitos", "Em implementação", "Em homologação", "Concluído"],
      produtos: Array.from(new Set(
        (tracksData || [])
          .filter(t => t.projeto_id === c.id && t.produto)
          .map(t => t.produto)
      )),
      tracks: (tracksData || []).filter(t => t.projeto_id === c.id)
    }));

    return combined;
  } catch (err) {
    console.error("Erro ao buscar clientes no Supabase:", err);
    return null;
  }
}

// 2. Save / Insert New Cliente and Tracks
export async function saveClienteWithTracks(newClient) {
  try {
    const { error: cErr } = await supabase.from('clientes').insert([{
      id: newClient.id,
      cliente: newClient.cliente,
      titulo: newClient.titulo,
      pais: newClient.pais,
      descricao: newClient.descricao,
      logo: newClient.logo,
      status: newClient.status,
      gerente_visa: newClient.gerente_visa,
      data_inicio: newClient.data_inicio,
      progresso: newClient.progresso
    }]);

    if (cErr) throw cErr;

    if (newClient.tracks && newClient.tracks.length > 0) {
      const tracksToInsert = newClient.tracks.map(t => ({
        id: t.id,
        projeto_id: newClient.id,
        nome: t.nome,
        tipo: t.tipo,
        produto: t.produto || '',
        mandato: t.mandato || '',
        descricao_outro: t.descricaoOutro || '',
        status: t.status,
        progresso: t.progresso,
        responsavel: t.responsavel,
        proximo_marco: t.proximo_marco
      }));

      const { error: tErr } = await supabase.from('tracks').insert(tracksToInsert);
      if (tErr) throw tErr;
    }

    return true;
  } catch (err) {
    console.error("Erro ao salvar cliente no Supabase:", err);
    return false;
  }
}

// 3. Update Existing Cliente and Tracks
export async function updateClienteWithTracks(updatedClient) {
  try {
    const { error: cErr } = await supabase
      .from('clientes')
      .update({
        cliente: updatedClient.cliente,
        titulo: updatedClient.titulo,
        pais: updatedClient.pais,
        descricao: updatedClient.descricao,
        logo: updatedClient.logo,
        status: updatedClient.status
      })
      .eq('id', updatedClient.id);

    if (cErr) throw cErr;

    await supabase.from('tracks').delete().eq('projeto_id', updatedClient.id);

    if (updatedClient.tracks && updatedClient.tracks.length > 0) {
      const tracksToInsert = updatedClient.tracks.map(t => ({
        id: t.id || `tr-${Date.now()}-${Math.random()}`,
        projeto_id: updatedClient.id,
        nome: t.nome,
        tipo: t.tipo,
        produto: t.produto || '',
        mandato: t.mandato || '',
        descricao_outro: t.descricaoOutro || '',
        status: t.status,
        progresso: t.progresso || 20,
        responsavel: t.responsavel,
        proximo_marco: t.proximo_marco || 'Alinhamento Inicial'
      }));

      const { error: tErr } = await supabase.from('tracks').insert(tracksToInsert);
      if (tErr) throw tErr;
    }

    return true;
  } catch (err) {
    console.error("Erro ao atualizar cliente no Supabase:", err);
    return false;
  }
}

// 4. Delete Cliente
export async function deleteClienteSupabase(projectId) {
  try {
    const { error } = await supabase.from('clientes').delete().eq('id', projectId);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Erro ao excluir cliente no Supabase:", err);
    return false;
  }
}

// 5. Fetch Reunioes
export async function fetchReunioesSupabase() {
  try {
    const { data, error } = await supabase.from('reunioes').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Erro ao buscar reuniões no Supabase:", err);
    return null;
  }
}

// 6. Save Reuniao
export async function saveReuniaoSupabase(newMeeting) {
  try {
    const { error } = await supabase.from('reunioes').insert([{
      id: newMeeting.id,
      projeto_id: newMeeting.projeto_id,
      track_id: newMeeting.track_id,
      cliente: newMeeting.cliente,
      track_nome: newMeeting.track_nome,
      titulo: newMeeting.titulo,
      data: newMeeting.data,
      escopo: newMeeting.escopo,
      tipo: newMeeting.tipo,
      resumo_ia: newMeeting.resumo_ia,
      participantes: newMeeting.participantes,
      action_items: newMeeting.action_items
    }]);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Erro ao salvar reunião no Supabase:", err);
    return false;
  }
}

// 7. Fetch Conhecimento Geral & Dicionario
export async function fetchConhecimentoGeralSupabase() {
  try {
    const { data, error } = await supabase.from('conhecimento_geral').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Erro ao buscar conhecimento geral no Supabase:", err);
    return null;
  }
}

export async function fetchDicionarioSupabase() {
  try {
    const { data, error } = await supabase.from('dicionario').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Erro ao buscar dicionário no Supabase:", err);
    return null;
  }
}
