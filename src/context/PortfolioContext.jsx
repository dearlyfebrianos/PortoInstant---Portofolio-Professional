import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AUTOSAVE_KEY = "portoinstant_autosave";
const DRAFTS_KEY = "portoinstant_drafts";

export const defaultData = {
  name: "",
  title: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  github: "",
  avatar: "",
  skills: [],
  projects: [],
  experience: [],
  education: [],
  selectedTemplate: "minimal",
};

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    } catch {
      return defaultData;
    }
  });

  const [drafts, setDrafts] = useState(() => {
    try {
      const saved = localStorage.getItem(DRAFTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentDraftName, setCurrentDraftName] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (saved) return JSON.parse(saved)._draftName || null;
      return null;
    } catch {
      return null;
    }
  });

  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    try {
      const toSave = { ...data, _draftName: currentDraftName };
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(toSave));
      setLastSaved(new Date());
    } catch {
      console.warn("Autosave gagal");
    }
  }, [data, currentDraftName]);

  const updateField = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateArrayField = useCallback((field, index, value) => {
    setData((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  }, []);

  const addArrayItem = useCallback((field, item) => {
    setData((prev) => ({ ...prev, [field]: [...prev[field], item] }));
  }, []);

  const removeArrayItem = useCallback((field, index) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  }, []);

  const saveDraft = useCallback((draftName) => {
    const trimmed = draftName.trim();
    if (!trimmed) return { success: false, message: "Nama draft tidak boleh kosong" };

    let isUpdate = false;

    setDrafts((prev) => {
      const existingIdx = prev.findIndex(
        (d) => d.name.toLowerCase() === trimmed.toLowerCase()
      );
      let updated;
      if (existingIdx !== -1) {
        isUpdate = true;
        updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          data: { ...data },
          savedAt: new Date().toISOString(),
        };
      } else {
        updated = [
          ...prev,
          {
            id: Date.now().toString(),
            name: trimmed,
            data: { ...data },
            savedAt: new Date().toISOString(),
          },
        ];
      }
      try {
        localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
      } catch {
        console.warn("Gagal simpan draft ke localStorage");
      }
      return updated;
    });

    setCurrentDraftName(trimmed);
    return {
      success: true,
      message: isUpdate
        ? `Draft "${trimmed}" diperbarui`
        : `Draft "${trimmed}" berhasil disimpan`,
    };
  }, [data]);

  const loadDraft = useCallback((draftId) => {
    const draft = drafts.find((d) => d.id === draftId);
    if (!draft) return { success: false, message: "Draft tidak ditemukan" };
    setData({ ...defaultData, ...draft.data });
    setCurrentDraftName(draft.name);
    return { success: true, message: `Draft "${draft.name}" berhasil dimuat` };
  }, [drafts]);

  const deleteDraft = useCallback((draftId) => {
    const draft = drafts.find((d) => d.id === draftId);
    setDrafts((prev) => {
      const updated = prev.filter((d) => d.id !== draftId);
      try {
        localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
      } catch {
        console.warn("Gagal hapus draft");
      }
      return updated;
    });
    if (draft && draft.name === currentDraftName) {
      setCurrentDraftName(null);
    }
    return { success: true, message: `Draft "${draft?.name}" dihapus` };
  }, [drafts, currentDraftName]);

  const renameDraft = useCallback((draftId, newName) => {
    const trimmed = newName.trim();
    if (!trimmed) return { success: false, message: "Nama tidak boleh kosong" };
    const duplicate = drafts.find(
      (d) => d.name.toLowerCase() === trimmed.toLowerCase() && d.id !== draftId
    );
    if (duplicate) return { success: false, message: "Nama draft sudah dipakai" };

    const oldName = drafts.find((d) => d.id === draftId)?.name;

    setDrafts((prev) => {
      const updated = prev.map((d) =>
        d.id === draftId ? { ...d, name: trimmed } : d
      );
      try {
        localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
      } catch {
        console.warn("Gagal rename draft");
      }
      return updated;
    });

    if (oldName === currentDraftName) setCurrentDraftName(trimmed);
    return { success: true, message: `Draft diubah menjadi "${trimmed}"` };
  }, [drafts, currentDraftName]);

  const newDraft = useCallback(() => {
    setData({ ...defaultData });
    setCurrentDraftName(null);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        setData,
        drafts,
        currentDraftName,
        lastSaved,
        updateField,
        updateArrayField,
        addArrayItem,
        removeArrayItem,
        saveDraft,
        loadDraft,
        deleteDraft,
        renameDraft,
        newDraft,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
};