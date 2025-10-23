
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from '@/components/IconSymbol';
import TrickCard from '@/components/TrickCard';
import { Trick, TrickCategory, DifficultyLevel } from '@/types/tricks';

type SortOption = 'a-z' | 'z-a' | 'shortest' | 'longest';

export default function TricksScreen() {
  const theme = useTheme();
  const { tricks } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TrickCategory | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('a-z');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const categories: (TrickCategory | 'All')[] = ['All', 'Card Tricks', 'Coin Tricks', 'Mind Reading', 'Close Up Magic', 'Illusions'];
  const difficulties: (DifficultyLevel | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'a-z', label: 'A to Z' },
    { value: 'z-a', label: 'Z to A' },
    { value: 'shortest', label: 'Shortest First' },
    { value: 'longest', label: 'Longest First' }
  ];

  const filteredAndSortedTricks = useMemo(() => {
    let filtered = tricks.filter(trick => {
      const matchesSearch = trick.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || trick.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || trick.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        case 'shortest':
          return a.estimatedTime - b.estimatedTime;
        case 'longest':
          return b.estimatedTime - a.estimatedTime;
        default:
          return 0;
      }
    });

    return filtered;
  }, [tricks, searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  const DropdownModal = ({ 
    visible, 
    onClose, 
    options, 
    selectedValue, 
    onSelect, 
    title 
  }: { 
    visible: boolean; 
    onClose: () => void; 
    options: any[]; 
    selectedValue: any; 
    onSelect: (value: any) => void; 
    title: string;
  }) => (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={[styles.dropdownModal, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.dropdownTitle, { color: theme.colors.text }]}>{title}</Text>
          <ScrollView style={styles.dropdownScroll}>
            {options.map((option) => {
              const value = typeof option === 'string' ? option : option.value;
              const label = typeof option === 'string' ? option : option.label;
              const isSelected = selectedValue === value;
              
              return (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.dropdownOption,
                    isSelected && { backgroundColor: theme.colors.primary + '20' }
                  ]}
                  onPress={() => {
                    onSelect(value);
                    onClose();
                  }}
                >
                  <Text style={[
                    styles.dropdownOptionText,
                    { color: isSelected ? theme.colors.primary : theme.colors.text }
                  ]}>
                    {label}
                  </Text>
                  {isSelected && (
                    <IconSymbol name="checkmark" size={20} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Vault of Tricks</Text>
        <Text style={[styles.slogan, { color: theme.dark ? '#98989D' : '#666' }]}>
          Master the Art of Wonder
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
          {filteredAndSortedTricks.length} tricks available
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.dark ? '#1C1C1E' : '#F2F2F7' }]}>
          <IconSymbol name="magnifyingglass" size={20} color={theme.dark ? '#98989D' : '#8E8E93'} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search tricks..."
            placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersRow}>
        <TouchableOpacity
          style={[styles.filterDropdown, { backgroundColor: theme.dark ? '#1C1C1E' : '#F2F2F7' }]}
          onPress={() => setShowCategoryDropdown(true)}
        >
          <Text style={[styles.filterDropdownText, { color: theme.colors.text }]}>
            {selectedCategory}
          </Text>
          <IconSymbol name="chevron.down" size={16} color={theme.dark ? '#98989D' : '#8E8E93'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterDropdown, { backgroundColor: theme.dark ? '#1C1C1E' : '#F2F2F7' }]}
          onPress={() => setShowDifficultyDropdown(true)}
        >
          <Text style={[styles.filterDropdownText, { color: theme.colors.text }]}>
            {selectedDifficulty}
          </Text>
          <IconSymbol name="chevron.down" size={16} color={theme.dark ? '#98989D' : '#8E8E93'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterDropdown, { backgroundColor: theme.dark ? '#1C1C1E' : '#F2F2F7' }]}
          onPress={() => setShowSortDropdown(true)}
        >
          <Text style={[styles.filterDropdownText, { color: theme.colors.text }]}>
            {sortOptions.find(o => o.value === sortBy)?.label}
          </Text>
          <IconSymbol name="chevron.down" size={16} color={theme.dark ? '#98989D' : '#8E8E93'} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.tricksContainer,
          Platform.OS !== 'ios' && styles.tricksContainerWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {filteredAndSortedTricks.map(trick => (
          <TrickCard key={trick.id} trick={trick} />
        ))}
        {filteredAndSortedTricks.length === 0 && (
          <View style={styles.emptyState}>
            <IconSymbol name="sparkles" size={48} color={theme.dark ? '#98989D' : '#8E8E93'} />
            <Text style={[styles.emptyText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              No tricks found
            </Text>
          </View>
        )}
      </ScrollView>

      <DropdownModal
        visible={showCategoryDropdown}
        onClose={() => setShowCategoryDropdown(false)}
        options={categories}
        selectedValue={selectedCategory}
        onSelect={setSelectedCategory}
        title="Select Category"
      />

      <DropdownModal
        visible={showDifficultyDropdown}
        onClose={() => setShowDifficultyDropdown(false)}
        options={difficulties}
        selectedValue={selectedDifficulty}
        onSelect={setSelectedDifficulty}
        title="Select Difficulty"
      />

      <DropdownModal
        visible={showSortDropdown}
        onClose={() => setShowSortDropdown(false)}
        options={sortOptions}
        selectedValue={sortBy}
        onSelect={setSortBy}
        title="Sort By"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  slogan: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  filterDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  filterDropdownText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  tricksContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tricksContainerWithTabBar: {
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    width: '80%',
    maxHeight: '60%',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  dropdownTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dropdownScroll: {
    maxHeight: 300,
  },
  dropdownOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  dropdownOptionText: {
    fontSize: 16,
  },
});
