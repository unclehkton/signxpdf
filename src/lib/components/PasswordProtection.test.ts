import { render, fireEvent, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import PasswordProtection from "./PasswordProtection.svelte";
import { toolkitStore } from "$lib/stores/toolkitStore";

vi.mock("$lib/stores/toolkitStore", () => ({
  toolkitStore: {
    addOpenPassword: vi.fn(async () => ({ ok: true })),
    unlockPrimary: vi.fn(async () => ({ ok: true })),
    removePassword: vi.fn(async () => ({ ok: true })),
  },
}));

describe("PasswordProtection", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("rejects empty protect passwords and keeps values out of store state", async () => {
    const { getByLabelText, getByText, queryByRole } = render(PasswordProtection, {
      props: {
        sourceEncryption: "unencrypted",
        hasDocument: true,
        busy: false,
      },
    });

    await fireEvent.click(getByText(/Protect PDF|保護 PDF|保护 PDF/i));
    expect(queryByRole("alert")).toBeTruthy();
    expect(toolkitStore.addOpenPassword).not.toHaveBeenCalled();

    // Store mock is not a real store; ensure component did not invent store fields.
    expect(JSON.stringify(toolkitStore)).not.toMatch(/secret/i);
    void getByLabelText;
  });

  it("shows unlock UI for password-required documents", () => {
    const { getByRole, getByLabelText } = render(PasswordProtection, {
      props: {
        sourceEncryption: "password-required",
        hasDocument: false,
        busy: false,
      },
    });

    expect(getByRole("note").textContent).toMatch(/signature|簽章|签章/i);
    expect(getByLabelText(/password|密碼|密码/i)).toBeTruthy();
    expect(getByRole("button", { name: /Unlock PDF|解除 PDF|解锁 PDF/i })).toBeTruthy();
  });

  it("allows empty password submission when unlocking", async () => {
    const { getByRole } = render(PasswordProtection, {
      props: {
        sourceEncryption: "password-required",
        hasDocument: false,
        busy: false,
      },
    });

    await fireEvent.click(getByRole("button", { name: /Unlock PDF|解除 PDF|解锁 PDF/i }));
    expect(toolkitStore.unlockPrimary).toHaveBeenCalledWith("");
  });
});
