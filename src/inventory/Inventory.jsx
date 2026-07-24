import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { consumeHealingItem, getInventory } from "../api/inventory.js";
import { useAuth } from "../auth/AuthContext.jsx";
import "./Inventory.css";

const MAX_PLAYER_HEARTS = 3;

function getHealingAmount(item) {
  const match = /^Restores\s+(\d+)\s+heart/i.exec(item?.effect ?? "");
  return match ? Number(match[1]) : 0;
}

export default function Inventory({
  embedded = false,
  onClose,
  playerHearts = MAX_PLAYER_HEARTS,
  onPlayerHeartsChange = () => {},
}) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingItem, setUsingItem] = useState(false);
  const [message, setMessage] = useState("");
  const [equippedWeaponId, setEquippedWeaponId] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadInventory() {
      if (!token) {
        setLoading(false);
        setMessage("Log in to access your inventory.");
        return;
      }

      try {
        const inventoryItems = await getInventory(token);
        if (!active) return;
        setItems(inventoryItems);
        setSelectedItemId((currentId) => currentId ?? inventoryItems[0]?.id ?? null);
      } catch (error) {
        if (active) {
          setMessage(error instanceof Error ? error.message : "Unable to load inventory.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadInventory();
    return () => {
      active = false;
    };
  }, [token]);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedItemId) ?? null,
    [items, selectedItemId],
  );
  const healingAmount = getHealingAmount(selectedItem);
  const canHeal =
    selectedItem?.canUse && healingAmount > 0 && playerHearts < MAX_PLAYER_HEARTS;

  async function handleUseItem() {
    if (!selectedItem || !token || !canHeal || usingItem) return;

    setUsingItem(true);
    setMessage("");

    try {
      const result = await consumeHealingItem(selectedItem.id, token);
      const nextHearts = Math.min(
        MAX_PLAYER_HEARTS,
        playerHearts + result.healingAmount,
      );
      const remainingItems = items.filter((item) => item.id !== selectedItem.id);

      onPlayerHeartsChange(nextHearts);
      setItems(remainingItems);
      setSelectedItemId(remainingItems[0]?.id ?? null);
      setMessage(
        `${result.item.name} restored ${nextHearts - playerHearts} heart${
          nextHearts - playerHearts === 1 ? "" : "s"
        }.`,
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to use that item.");
    } finally {
      setUsingItem(false);
    }
  }

  function handleToggleEquip() {
    if (!selectedItem?.canEquip) return;

    const equipping = equippedWeaponId !== selectedItem.id;
    setEquippedWeaponId(equipping ? selectedItem.id : null);
    setMessage(`${selectedItem.name} ${equipping ? "equipped" : "unequipped"}.`);
  }

  return (
    <section className={`inventory-page${embedded ? " inventory-embedded" : ""}`}>
      <header className="inventory-header">
        <div>
          <p className="inventory-eyebrow">Satchel</p>
          <h1>Inventory</h1>
          <p>Items dropped by defeated enemies are stored here.</p>
        </div>
        <button
          type="button"
          className="inventory-close"
          onClick={onClose ?? (() => navigate(-1))}
        >
          {onClose ? "Close inventory" : "Back"}
        </button>
      </header>

      <p className="inventory-health">Health: {playerHearts}/{MAX_PLAYER_HEARTS}</p>

      {loading ? (
        <p className="inventory-status">Loading inventory...</p>
      ) : (
        <div className="inventory-layout">
          <section className="inventory-list-panel" aria-label="Inventory items">
            <div className="inventory-panel-heading">
              <h2>Items</h2>
              <span>{items.length} owned</span>
            </div>

            {items.length === 0 ? (
              <p className="inventory-empty">
                Your satchel is empty. Defeated enemies may drop items.
              </p>
            ) : (
              <div className="inventory-list">
                {items.map((item) => (
                  <button
                    type="button"
                    className={`inventory-item${
                      item.id === selectedItemId ? " selected" : ""
                    }`}
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                  >
                    <span className="inventory-item-name">{item.name}</span>
                    <span>
                      {item.type} · Area {item.locationId}
                      {equippedWeaponId === item.id ? " · Equipped" : ""}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="inventory-detail" aria-live="polite">
            {selectedItem ? (
              <>
                <div className="inventory-art">
                  {selectedItem.imageUrl ? (
                    <img src={selectedItem.imageUrl} alt={`${selectedItem.name} item`} />
                  ) : (
                    <span>No item art</span>
                  )}
                </div>
                <p className="inventory-item-type">{selectedItem.type}</p>
                <h2>{selectedItem.name}</h2>
                <p>{selectedItem.description}</p>
                <p className="inventory-effect">Effect: {selectedItem.effect}</p>

                {healingAmount > 0 ? (
                  <button
                    type="button"
                    onClick={handleUseItem}
                    disabled={!canHeal || usingItem}
                  >
                    {playerHearts >= MAX_PLAYER_HEARTS
                      ? "Health is already full"
                      : usingItem
                        ? "Using item..."
                        : `Use and restore ${healingAmount} heart${healingAmount === 1 ? "" : "s"}`}
                  </button>
                ) : selectedItem.canEquip ? (
                  <button type="button" onClick={handleToggleEquip}>
                    {equippedWeaponId === selectedItem.id
                      ? "Unequip weapon"
                      : "Equip weapon"}
                  </button>
                ) : (
                  <p className="inventory-note">
                    This item cannot restore health.
                  </p>
                )}
              </>
            ) : (
              <p className="inventory-empty">Select an item to inspect it.</p>
            )}
          </section>
        </div>
      )}

      <p className="inventory-status" role="status" aria-live="polite">
        {message}
      </p>
    </section>
  );
}
